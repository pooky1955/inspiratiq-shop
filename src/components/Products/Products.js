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
	    fluid(maxWidth : 300) {
	      ...GatsbyImageSharpFluid_withWebp_tracedSVG
	    }
	    id
	  }
	}
      }
    }
  }

`;
const ProductsView = ({ prices, filterFn, displayProduct }) => {
  const remainingPrices = prices.filter(filterFn);
  // debugger
  return (
    <div style={containerStyles}>
      {remainingPrices.map((price) => (
        <ProductCard
          key={price.sku}
          product={price}
          displayProduct={displayProduct}
        />
      ))}
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
  const patt = /[^a-zA-Z]/g
  return name.replace(patt,"").toLowerCase()
}
const getPricesData = ({ prices, images }) => {
  let myDict = {};
  images.edges.forEach(({ node: image }) => {
    const dirName = getDirName(image.dir);
    const imageName = parseName(dirName.split("-")[0])
    const index = parseInt(image.name);
    addToDict(myDict, imageName, index, image);
  });
  const pricesData = prices.edges.map(({ node: price }) => {
    const imageName = parseName(price.product.name)
    const images = myDict[imageName];
    //console.table(Object.entries((myDict)))
    if (images != undefined){
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
    };
    return data;
  });
  return pricesData;
};

function usePricesData(){
  const data = useStaticQuery(productsQuery);
  const pricesData = getPricesData(data);
  return pricesData
}
const Products = (props) => {
  const { collection, displayProduct } = props;
  const filterFn = (product) => {
    // debugger
    return ((collection === "") ||
      (product.metadata.collection === collection)) &&
      (product.name !== "Shipping");
  };
  const pricesData = usePricesData()
  return (
    <ProductsView
      prices={pricesData}
      filterFn={filterFn}
      displayProduct={displayProduct}
    />
  );
};

export default Products;
