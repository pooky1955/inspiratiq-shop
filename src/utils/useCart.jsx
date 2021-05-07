import { useStaticQuery } from "gatsby";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";

const cartQuery = graphql`
  query CartQuery {
    prices: allStripePrice(
        filter: { active: { eq: true }, product: { active: { eq: true },  } }
      sort: { fields: [product___metadata___order] }
    ) {
      edges {
        node {
          id
         
        }
      }
    }
    
  }
`;

export const useCart = () => {
  const { data } = useStaticQuery(cartQuery);
  const validIds = new Set(data.edges.map(({node}) => {
    return node.id 
  }))
  const { cartDetails } = useShoppingCart();
  cartDetails.filter(product => product.sku )
  // now it's time to validate
};
