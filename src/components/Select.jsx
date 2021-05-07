import React from "react"

import {makeStyles} from "@material-ui/styles"
const useSelectStyles = makeStyles({
  selectMenu: {
    padding: ".8rem",
    background: "#FFFDFB",
    border: "1px solid black",
    width : "100%",
    // width : "40vw",
    borderRadius: "0.5rem",
    "&::-ms-expand": {
      display: "none",
      appearance: "none",
    },
    "select::-ms-expand": {
      display: "none",
    },
  },
  selectContainer: {
    position: "relative",
    "& select": {
      appearance: "none",
      //width: "18rem",
    },
    "&:after": {
      content: "'< >'",
      color: "black",
      position: "absolute",
      pointerEvents: "none",
      transform: "rotate(90deg)",
      right: "0%",
      top: "25%",
    },
  },
});
export const Select = ({ data, value, onChange }) => {
  const classes = useSelectStyles();
  const options = data.map(({ name, value }) => {
    return <option value={value} key={name}>{name}</option>;
  });
  return (
    <div className={classes.selectContainer}>
      <select
        id="select-collection"
        value={value}
        onChange={onChange}
        className={classes.selectMenu}
      >
        {options}
      </select>
    </div>
  );
};

