import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const useStyles = makeStyles({
  buttonStyles: {
    display: "block",
    fontSize: "13px",
    textAlign: "center",
    color: "#000",
    padding: "12px",
    boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
    backgroundColor: "rgb(255, 178, 56)",
    borderRadius: "6px",
    letterSpacing: "1.5px",
  },

  cardStyles: {
    display: "flex",
    justifyContent: "space-around",
    // padding: '2rem',
    // margin: "1rem",
    justifySelf: "center",
    marginBottom: "1rem",
    borderRadius: "6px",
    //maxWidth: '17.5em',
  },

  buttonDisabledStyles: {
    opacity: "0.5",
    cursor: "not-allowed",
  },

  overlay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      filter: "brightness(90%)",
    },
  },
  productName: {
    fontFamily: '"Fira Code", monospace',
    textTransform: "uppercase",
    fontSize: "1.3rem",
    fontWeight: "600",
    marginTop: "0.25rem",
    marginBottom: "0.5rem",
    color: "#F88A17",
    width: "13rem",
  },
  button: {
    background: "none",
    border: "none",
  },
  linkStyle: {
    textDecoration: "none",
    color: "inherit",
  },
  image: {
    width: "100%",
    //filter: 'grayscale(100%)',
    //maxWidth : "100%"
  },
  soldOutImage: {
    width: "100%",
  },
  soldOut: {
    color: "#ff6748",
    fontWeight: "700",
    textTransform: "uppercase",
  },
});

export const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2);
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(price);
};

const ProductCard = ({ products }) => {
  const product = products[0];
  const priceList = products.map((product) => product.price);
  const minRange = Math.min(...priceList);
  const maxRange = Math.max(...priceList);
  debugger;
  const priceString = maxRange > minRange
    ? `${formatPrice(minRange, product.currency)} - ${
      formatPrice(maxRange, product.currency)
    }`
    : `${formatPrice(maxRange, product.currency)}`;

  const classes = useStyles();
  //console.log(product)
  //console.log(product)
  if (product === null) {
    return null;
  }
  if (!product.gatsbyImages) {
    return null;
  }
  if (!product.gatsbyImages[0]){
    return null;
  }
  const fixedImg = product.gatsbyImages[0].childImageSharp.fluid;
  const soldOut = product.metadata.soldOut;
  if (soldOut !== null) {
    return (
      <div className={classes.cardStyles}>
        <fieldset style={{ border: "none" }}>
          <div className={classes.overlay}>
            <button
              className={classes.button}
            >
              <Img
                fluid={fixedImg}
                durationFadeIn={100}
                className={classes.soldOutImage}
              >
              </Img>
              <div className={classes.productName}>
                {product.name}
              </div>
            </button>
            <label>
              {priceString}
            </label>
            <div className={classes.soldOut}>Sold out</div>
          </div>
        </fieldset>
      </div>
    );
  }

  //alert(JSON.stringify(Object.keys(fixedImg)))

  return (
    <div className={classes.cardStyles}>
      <fieldset style={{ border: "none" }}>
        <Link
          to={`/product/${product.productId}`}
          className={classes.linkStyle}
        >
          <div className={classes.overlay}>
            <button
              className={classes.button}
            >
              <Img
                fluid={fixedImg}
                durationFadeIn={100}
                className={classes.image}
              >
              </Img>
              <div className={classes.productName}>
                {product.name}
              </div>
            </button>
            <label>
              {priceString}
            </label>
          </div>
        </Link>
      </fieldset>
    </div>
  );
};

export default ProductCard;
