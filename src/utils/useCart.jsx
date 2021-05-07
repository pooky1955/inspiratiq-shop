import { useStaticQuery } from "gatsby";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { graphql } from "gatsby";

const cartQuery = graphql`

query CartQuery {
  prices: allStripePrice(
    filter: {
      active: {eq: true}, 
      product: {
        active: {eq: true},
      	metadata: {soldOut: {eq: null}}}
    }) {
    edges {
      node {
        id
        product {
          metadata {
            soldOut
          }
        }
      }
    }
  }
}
`;

const dc = (compfn, iterable) => {
  const initialDict = {};
  iterable.map(compfn).forEach(([key, value]) => {
    initialDict[key] = value;
  });
  return initialDict;
};

export const CartVerifier = () => {
  const { loadCart, clearCart, cartDetails } = useShoppingCart();
  const { prices: data } = useStaticQuery(cartQuery);
  const validIds = new Set(data.edges.map(({ node }) => {
    return node.id;
  }));
  const filteredCart = Object.values(cartDetails).filter(({ sku }) =>
    validIds.has(sku)
  );
  const isOk = filteredCart.length === Object.values(cartDetails).length;
  if (!isOk) {
    const newCart = dc((prod) => [prod.sku, prod], filteredCart);
    loadCart(newCart, false);
  }
  const undefinedCount = 0;
  for (let product of Object.values(cartDetails)) {
    if (product.name !== "Shipping" && !product.gatsbyImages && product.image) {
      undefinedCount += 1;
    }
  }
  if (undefinedCount >= 1) {
    clearCart();
  }
  return null;
};
