/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const getDirName = (dir) => {
  const splitted = dir.split('/')
  return splitted[splitted.length - 1]
}

const addToDict = (myDict, imageKeyName, index, image) => {
  if (!myDict[imageKeyName]) {
    myDict[imageKeyName] = {}
  }
  myDict[imageKeyName][index] = image
}
const parseName = (name) => {
  const patt = /[^a-zA-Z]/g
  return name.replace(patt, '').toLowerCase()
}
const getPricesData = ({ prices, images }) => {
  let myDict = {}
  images.edges.forEach(({ node: image }) => {
    const dirName = getDirName(image.dir)
    const imageName = parseName(dirName.split('-')[0])
    const index = parseInt(image.name)
    addToDict(myDict, imageName, index, image)
    //console.log({imageName,index,image})
  })
  const pricesData = prices.edges.map(({ node: price }) => {
    const imageName = parseName(price.product.name)
    const images = myDict[imageName]
    const data = {
      sku: price.id,
      name: price.product.name,
      price: price.unit_amount,
      currency: price.currency,
      image: price.product.images[0],
      gatsbyImages: images,
      metadata: price.product.metadata,
      productId : price.product.id,
      nickname : price.nickname
    }
    return data
  })
  return pricesData
}

const groupProducts = (prices) => {
  const groupedProducts = {};
  prices.forEach((price) => {
    const { productId } = price;
    if (productId in groupedProducts) {
      groupedProducts[productId].push(price);
    } else {
      groupedProducts[productId] = [price];
    }
  });
  return groupedProducts;
};
exports.createPages = async ({ graphql, actions, reporter, createNodeId }) => {
  const { createPage } = actions
  const data = await graphql(`
    query ProductPrices {
      prices: allStripePrice(
        filter: { active: { eq: true }, product: { active: { eq: true },metadata : {soldOut : {eq : null}} } }
        sort: { fields: [product___metadata___order] }
      ) {
        edges {
          node {
            id
            active
            currency
            unit_amount
            nickname
            product {
              id
              active
              name
              images
              metadata {
                collection
                additionalDescription
                order
                soldOut
              }
            }
          }
        }
      }
      images: allFile(filter: { dir: { regex: "/(.*)price(.*)/i" } }) {
        edges {
          node {
            id
            name
            dir
            publicURL
            childImageSharp {
              fluid(maxWidth: 600) {
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
                tracedSVG
              }
            }
          }
        }
      }
    }
  `)
  if (data.errors) {
    reporter.panic('Error loading stripe products!', reporter.errors)
  }
  const { prices, images } = data.data
  const productTemplate = path.resolve(`src/templates/Product.jsx`)

  const pricesData = getPricesData({ prices, images })
  const groupedProducts = groupProducts(pricesData)
  Object.entries(groupedProducts).map(([productId,products]) => {
    console.log("creating a page for products")
    console.log(products)
    createPage({

      path: `/product/${productId}`,
      component: productTemplate,
      context: {
        products
      },
    })

  })
}
