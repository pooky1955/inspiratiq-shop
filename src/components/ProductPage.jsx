import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select } from "./Select"
import Products from "./Products/Products";
import CartButton from "../components/CartButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyle = makeStyles({
  browse: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  browseBy: {
    paddingRight: "1rem",
  },
  topContainer: (props) => ({
    display: "flex",
    flexDirection: props.flexDirection,
    alignItems: "center",
    justifyContent: "space-between",
  }),
  title: {
    color: "#F88A17",
    marginBottom: "2rem",
  },

  returnButton: {
    border: "none",
    background: "none",
  },
  returnText: {
    "&:hover": {
      filter: "brightness(150%)",
    },
  },
  cartNavigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});



export const ProductPage = () => {
  let props;
  const desktopMatches = useMediaQuery("(min-width: 700px)");
  const phoneMatches = useMediaQuery("(min-width: 600px");
  props = { flexDirection: "row" };
  const classes = useStyle(props);
  const [collection, setCollection] = useState("");
  const handleChange = (e) => {
    setCollection(e.target.value);
  };

  const selectData = [
    { name: "All Prints", value: "" },
    { name: "Studio Ghibli Collection", value: "Studio Ghibli" },
    // { name: "Wanderlust Collection", value: "Wanderlust" },
    // { name : "Stickers Collection", value : "Stickers" },
    { name : "ATLA Collection", value : "ATLA" },
    { name : "Animal Friends Collection", value : "Animal Friends" },
    { name : "Sailor Moon Collection", value : "Sailor Moon"}
  ];

  return (
    <>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>PRINTS</h1>
        {!desktopMatches && <CartButton />}
      </div>
      <div className={classes.topContainer}>
        <div className={classes.browse}>
          {phoneMatches &&
            <div className={classes.browseBy}>
              <label htmlFor="select-collection">
                Browse by
              </label>
            </div>}

          <Select
            data={selectData}
            onChange={handleChange}
            value={collection}
          />
        </div>
        {desktopMatches && <CartButton />}
      </div>
      <div>
        <Products
          collection={collection}
        />
      </div>
    </>
  );
};

export default ProductPage;
