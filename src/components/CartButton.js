import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";
import Cart from "../images/shopping-cart.png";
import { useShoppingCart } from "use-shopping-cart";

const useStyle = makeStyles({
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
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    "&:hover": {
      filter: "brightness(104%)",
    },
  },
});
export const CartButton = () => {
  const classes = useStyle();
  const { cartDetails, cartCount } = useShoppingCart();
  const hasShipping =
    Object.values(cartDetails).filter((product) => product.name === "Shipping")
      .length === 1;
  const realCartCount = hasShipping ? cartCount - 1 : cartCount;
  return (
    <div>
      <Link to="/Cart" className={classes.cartButton}>
        <div className={classes.cartLogo}>
          <img src={Cart} height="30" className={classes.cart} alt="cart icon"/>
        </div>
        <div>Cart ({realCartCount} items)</div>
      </Link>
    </div>
  );
};

export default CartButton;
