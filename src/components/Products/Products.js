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
	    fluid(maxWidth : 1000) {
	      ...GatsbyImageSharpFluid
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
