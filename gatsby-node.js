/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const crypto = require("crypto");

const getDirName = (dir) => {
  const splitted = dir.split("/");
  return splitted[splitted.length - 1];
};

const addToDict = (myDict, dirName, index, image) => {
  if (!myDict[dirName]) {
    myDict[dirName] = {};
  }
  myDict[dirName][index] = image;
};

const getPricesData = ({ prices, images }) => {
  let myDict = {};
  images.edges.forEach(({ node: image }) => {
    const dirName = getDirName(image.dir);
    const index = parseInt(image.name);
    //console.log({ dirName, index });
    addToDict(myDict, dirName, index, image);
  });
  const pricesData = prices.edges.map(({ node: price }) => {
    const images = myDict[price.id];
    const data = {
      sku: price.id,
      name: price.product.name,
      price: price.unit_amount,
      currency: price.currency,
      image: price.product.images[0],
      gatsbyImages: images,
      metadata: price.product.metadata,
    };
    return data;
  });
  // console.log(pricesData)
  return pricesData;
  //alert("finished proocessing")
};

exports.createPages = async ({ graphql, actions, reporter, createNodeId }) => {
  const turnImageObjectIntoGatsbyNode = (image, product) => {
    const content = {
      content: product.sku,
      ["image___NODE"]: createNodeId(`product-image-{${product.sku}}`),
    };
    const nodeId = createNodeId(`image-{${image.id}}`);
    const nodeContent = JSON.stringify(image);
    const nodeContentDigest = crypto
      .createHash("md5")
      .update(nodeContent)
      .digest("hex");

    const nodeData = {
      ...image,
      ...content,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "Image",
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    };
    return nodeData;
  };

  const createImageObjectFromURL = (url) => {
    const lastIndexOfSlash = url.lastIndexOf("/");
    const id = url.slice(lastIndexOfSlash + 1, url.lastIndexOf("."));
    return { id, image: id, url };
  };

  const { createNode } = actions;

  const { createPage } = actions;
  const data = await graphql(`
    query ProductPrices {
      prices: allStripePrice(
	filter: { product: { active: { eq: true } } }
	sort: { fields: [unit_amount] }
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
		additionalDescription
		shipping
	      }
	    }
	  }
	}
      }
      images: allFile(filter: {dir: {regex: "/(.*)price(.*)/i"}}) {
	edges {
	  node {
	    id
	    name
	    dir
	    publicURL
	    childImageSharp {
	      fluid(maxWidth : 600) {
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
  `);
  if (data.errors) {
    reporter.panic("Error loading stripe products!", reporter.errors);
  }
  const { prices, images } = data.data;
  const productTemplate = path.resolve(`src/templates/Product.js`);

  const pricesData = getPricesData({ prices, images });
  pricesData.forEach((priceData) => {
    createPage({
      path: `/product/${priceData.sku}`,
      component: productTemplate,
      context: {
        product: priceData,
      },
    });
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type === "Image") {
    const { createNode } = actions;

    /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */
    console.log(`creating with parentNodeId ${node.id} and url ${node.url}`);
    const fileNode = await createRemoteFileNode({
      url: node.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      store, // Gatsby's redux store
      getCache, // get Gatsby's cache
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
    });

    if (fileNode) {
      // link the File node to Image node at field image
      node.image___NODE = fileNode.id;
    }
  }
};
exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type === "Image") {
    const { createNode } = actions;

    /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */

    const fileNode = await createRemoteFileNode({
      url: node.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      store, // Gatsby's redux store
      getCache, // get Gatsby's cache
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
    });

    if (fileNode) {
      // link the File node to Image node at field image
      node.image___NODE = fileNode.id;
    }
  }
};
