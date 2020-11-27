import React from "react";
import Img from "gatsby-image";
import { useShoppingCart } from "use-shopping-cart";
import { makeStyles } from "@material-ui/core";
import Shipping from "./Shipping";
import { formatPrice } from "./Products/ProductCard";
import Close from "../images/close.png";
import Down from "../images/downLight.png";
import Up from "../images/upLight.png";
import { Link } from "gatsby";

const useStyle = makeStyles({
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "1rem",
  },

  productName: (props) => ({
    fontWeight: "600",
    fontSize: props.fontSize,
  }),

  quantity: (props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    border: "0.1rem solid",
    width: props.width,
    height: props.height,
  }),

  changeQuantity: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.3rem",
    justifyContent: "space-between",
    height: "3rem",
  },
  quantityContainer: (props) => ({
    display: "flex",
    flexDirection: props.flexDirection,
    alignItems: "center",
  }),
  button: {
    background: "none",
    color: "inherit",
    border: "none",
  },
  isToggled: {
    "&:hover": {
      filter: "brightness(40%)",
    },
  },
  //   emptyCartMsg: {
  //     fontWeight: '600',
  //     marginBottom: '1rem',
  //   },

  removeButton: {
    background: "none",
    border: "none",
    textDecoration: "underline",
    color: "#C9A488",
    fontSize: ".75rem",
    marginTop: ".25rem",
    padding: "0",
  },
  quantityAndArrows: (props) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: props.marginBottom,
  }),
  //   cartContainer: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  itemLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      filter: "brightness(60%)",
    },
  },
  imageCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export const ProductCell = ({ product, phoneMatches, classes }) => {
  if (!product.gatsbyImages){
    return null
  }
  if (!product.gatsbyImages[0]){
    return null
  }
  const fluidImage = product.gatsbyImages[0].childImageSharp.fluid;
  console.log(fluidImage);
  return (
    <td
      className={classes.imageCell}
      style={{ height: "100%", paddingRight: "0" }}
    >
      <Link
        to={"/product/" + product.sku}
        style={{ height: "100%", width: "100%" }}
      >
        <Img
          durationFadeIn={100}
          fluid={fluidImage}
          height={phoneMatches ? "60" : "80"}
          style={{ height: "100%", width: "80%" }}
        >
        </Img>
      </Link>
    </td>
  );
};

export const RemoveButton = ({ product, phoneMatches, classes }) => {
  const { removeItem } = useShoppingCart();
  return (
    <td>
      <a href={"/product/" + product.sku} className={classes.itemLink}>
        <div className={classes.productName}>{product.name}</div>
      </a>
      {phoneMatches && (
        <button
          className={classes.removeButton}
          onClick={() => removeItem(product.sku)}
        >
          Remove
        </button>
      )}
    </td>
  );
};

export const ProductNumberSwitcher = ({ phoneMatches, product, props }) => {
  const classes = useStyle(props);
  const { incrementItem, decrementItem } = useShoppingCart();
  const currencyComponent = (
    <div>{formatPrice(product.price, product.currency)}</div>
  );

  return (
    <>
      {console.log(product.sku)}
      <td>
        <div className={classes.quantityContainer}>
          <div className={classes.quantityAndArrows}>
            <div className={classes.quantity}>{product.quantity}</div>
            <div className={classes.changeQuantity}>
              <button
                onClick={() => incrementItem(product.sku)}
                className={classes.button}
              >
                <img
                  className={classes.isToggled}
                  src={Up}
                  alt="up arrow"
                  height={phoneMatches ? "10" : "20"}
                  width={phoneMatches ? "10" : "20"}
                />
              </button>
              <button
                onClick={() => decrementItem(product.sku)}
                className={classes.button}
              >
                <img
                  className={classes.isToggled}
                  src={Down}
                  eight={phoneMatches ? "10" : "20"}
                  alt="down arrow"
                  width={phoneMatches ? "10" : "20"}
                />
              </button>
            </div>
          </div>
          {phoneMatches && currencyComponent}
        </div>
      </td>
      {!phoneMatches && <td>{currencyComponent}</td>}
    </>
  );
};
export const RemoveItemButton = ({ phoneMatches, product, classes }) => {
  const { removeItem } = useShoppingCart();
  return (
    <td>
      {!phoneMatches && (
        <button
          onClick={() => removeItem(product.sku)}
          className={classes.button}
        >
          <img
            src={Close}
            height="20"
            className={classes.isToggled}
            alt="close icon"
          />
        </button>
      )}
    </td>
  );
};
export const CartRow = ({ product, phoneMatches }) => {
  let props;

  if (phoneMatches) {
    props = {
      alignItems: "center",
      flexDirection: "column",
      height: "1.75rem",
      width: " 1.75rem",
      fontSize: "0.85rem",
      marginTop: "1rem",
      marginBottom: ".75rem",
    };
  } else {
    props = {
      width: "3rem",
      height: "3rem",
      alignItems: "flex-end",
      flexDirection: "row",
      fontSize: "1rem",
      marginTop: "0rem",
      marginBottom: "0rem",
    };
  }
  const classes = useStyle(props);
  const { incrementItem, decrementItem, removeItem } = useShoppingCart({});
  const cellProps = {
    product,
    phoneMatches,
    classes,
    incrementItem,
    decrementItem,
    removeItem,
    props,
  };
  return (
    <tr>
      <ProductCell {...cellProps} />
      <RemoveButton {...cellProps} />
      <ProductNumberSwitcher {...cellProps} />
      <RemoveItemButton {...cellProps} />
    </tr>
  );
};

export const CartTable = ({ phoneMatches, products }) => {
  return (
    <table>
      {products.map((val) => (
        <CartRow product={val} phoneMatches={phoneMatches}></CartRow>
      ))}
      <Shipping />
    </table>
  );
};

export default CartTable;
