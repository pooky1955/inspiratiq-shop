import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ProductCard from "./ProductCard";

const containerStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  padding: "1rem 0rem 1rem 0rem",
  gridGap: "4px",
  // gridColumnGap : "20px"
};

export const productsQuery = graphql`
  query ProductPrices {
    prices: allStripePrice(
        filter: { active: { eq: true }, product: { active: { eq: true },  } }
      sort: { fields: [product___metadata___order] }
    ) {
      edges {
        node {
          id
          active
          currency
          unit_amount
          product {
            id
            active
            name
            images
            metadata {
              collection
              order
              soldOut
              shipping
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
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            id
          }
        }
      }
    }
  }
`;

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

const ProductsView = ({ prices, filterFn }) => {
  const remainingPrices = prices.filter(filterFn);
  const groupedPrices = groupProducts(remainingPrices);

  const components = Object.entries(groupedPrices).map(
    ([productId, products]) => {
      return <ProductCard key={productId} products={products} />;
    },
  );
  return (
    <div style={containerStyles}>
      {components}
    </div>
  );
};

const getDirName = (dir) => {
  const splitted = dir.split("/");
  return splitted[splitted.length - 1];
};

const addToDict = (myDict, imageKeyName, index, image) => {
  if (!myDict[imageKeyName]) {
    myDict[imageKeyName] = {};
  }
  myDict[imageKeyName][index] = image;
};
const parseName = (name) => {
  const patt = /[^a-zA-Z0-9]/g;
  return name.replace(patt, "").toLowerCase();
};
const getPricesData = ({ prices, images }) => {
  let myDict = {};
  images.edges.forEach(({ node: image }) => {
    const dirName = getDirName(image.dir);
    const imageName = parseName(dirName.split("-")[0]);
    const index = parseInt(image.name);
    addToDict(myDict, imageName, index, image);
  });
  const pricesData = prices.edges.map(({ node: price }) => {
    const imageName = parseName(price.product.name);
    const images = myDict[imageName];
    //console.table(Object.entries((myDict)))
    if (images != undefined) {
      //alert(`Image name : ${imageName}`)
    }
    const data = {
      sku: price.id,
      name: price.product.name,
      price: price.unit_amount,
      currency: price.currency,
      image: price.product.images[0],
      gatsbyImages: images,
      metadata: price.product.metadata,
      productId: price.product.id,
    };
    return data;
  });
  return pricesData;
};

function usePricesData() {
  const data = useStaticQuery(productsQuery);
  const pricesData = getPricesData(data);
  return pricesData;
}
const Products = (props) => {
  const { collection  } = props;
  const filterFn = (product) => {
    return (
      (collection === "" || product.metadata.collection === collection) &&
      product.name !== "Shipping"
    );
  };
  const pricesData = usePricesData();
  return (
    <ProductsView
      prices={pricesData}
      filterFn={filterFn}
    />
  );
};

export default Products;
