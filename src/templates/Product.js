import React, { useState } from "react";
import Img from "gatsby-image";
import { makeStyles } from "@material-ui/styles";
import { formatPrice } from "../components/Products/ProductCard";
import { useShoppingCart } from "use-shopping-cart";
import Layout from "../components/layout";
import { Link } from "gatsby";
import CartButton from "../components/CartButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyle = makeStyles({
  itemContainer: (styleProps) => ({
    display: "flex",
    flexDirection: styleProps.flexDirection,
    marginTop: "1rem",
    alignItems: styleProps.alignItems,
  }),
  itemName: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#F88A17",
    marginBottom: "1rem",
  },
  itemDescription:  {
    display: "flex",
    flexDirection: "column",
    //marginLeft: "2rem",
    lineHeight: "2rem",
  },
  price: {
    marginBottom: "1rem",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  addCartButton: {
    width: "70%",
    maxWidth: "13rem",
    padding: "0.5rem 0rem",
    background: "#FFCDB7",
    border: "2px solid #FFE1D4",
    color: "#F38C6C",
    marginBottom: "1rem",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    "&:hover": {
      filter: "brightness(104%)",
    },
  },
  cart: {
    display: "flex",
    alignSelf: "flex-end",
  },
  cartLogo: {
    marginRight: ".5rem",
  },

  cartButton: {
    padding: ".5rem",
    background: "#FFB672",
    border: "2px solid #FFE1D4",
    color: "#FFF",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    //maxWidth : "30px",
    "&:hover": {
      filter: "brightness(104%)",
    },
  },

  link: {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.25rem",
    color: "#F88A17",
  },
  shopNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    //maxWidth: '85%',
  },
  imageContainer: {
    width: "80rem",
    maxWidth: "450px",
    marginBottom: "2rem",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    padding: "1rem 0rem 1rem 0rem",
    gridGap: "20px",
  },
  mainContainer: styleProps => ({
    display: "flex",
    flexDirection: styleProps.flexDirection,
    alignItems : "center"
  }),
  leftSide: {},
  rightSide: styleProps => ({
    marginLeft: styleProps.phoneMatches ? "auto" : "2rem",
  }),
  cartContainer: {
    //width: "50%",
    minWidth: "100px",
    maxWidth : "250px"
  },
  topContainer : {
    display : "flex",
    justifyContent : "space-between",
    marginBottom : "1rem"

  }
});

export const ProductItem = (props) => {
  let styleProps;
  const phoneMatches = useMediaQuery("(max-width: 768px)");
  const [isAdded, setIsAdded] = useState(false);

  if (phoneMatches) {
    styleProps = {
      flexDirection: "column",
      alignItems: "center",
      phoneMatches
    };
  } else {
    styleProps = {
      flexDirection: "row",
      alignItems: "flex-start",
      phoneMatches
    };
  }
  const classes = useStyle(styleProps);
  const { product } = props;
  const { addItem } = useShoppingCart();
  const fluidImg = product.gatsbyImages[0].childImageSharp.fluid;
  const handleClick = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 700);
  };

  const allImages = Object.entries(product.gatsbyImages).filter((
    [index, val],
  ) => index !== "0").map(([_, image]) => {
    return image.childImageSharp.fluid;
  });
  return (
    <div>
      <div className={classes.topContainer}>
        <div className={classes.shopNav}>
          <Link to="/" className={classes.link}>
            <div>{"<"} SHOP</div>
          </Link>
        </div>
        <div className={classes.cartContainer}>
          <CartButton />
        </div>
      </div>
      <div className={classes.mainContainer}>
        <div className={classes.leftSide}>
          <div className={classes.itemContainer}>
            <div className={classes.imageContainer}>
	      <Img fluid={fluidImg}  style={{width : "90%",margin : "auto"}}/>
            </div>
          </div>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.itemDescription}>
            <div className={classes.itemName}>{product.name}</div>
            <div className={classes.price}>
              {" "}
              {formatPrice(product.price, product.currency)}
            </div>
            {isAdded
              ? <button className={classes.addCartButton}>Added!</button>
              : <button
                className={classes.addCartButton}
                onClick={handleClick}
              >
                Add to cart
              </button>}
            <div>{product.metadata.additionalDescription}</div>
          </div>
        </div>
      </div>
      <div className={classes.gallery}>
        {allImages.map((fluid) =>
          <Img fluid={fluid} style={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
};

//export const pageQuery = graphql`
//`

export const ProductPage = (props) => {
  // alert(JSON.stringify(props))
  if (props.pageResources) {
    const product = props.pageResources.json.pageContext.product;
    return (
      <Layout>
        <ProductItem product={product} />
      </Layout>
    );
  } else {
    return null;
  }
};

export default ProductPage;
