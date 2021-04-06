import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  titleName: {
    color: "#F88A17",
    lineHeight: "3rem",
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    color: "#FC9C74",
    fontSize: "1.2rem",
    fontFamily: "Fira Code,monospace",
  },
  self: (props) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: props.flexDirection,
  }),
  container : {
    width : "100%"
  },
  titleBox: (props) => ({
    display: "flex",
    // flexDirection: 'row',
    alignItems: "center",
  }),
  icon: {
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    display: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: "1rem",
    background: "#FFCDB7",
    border: "2px solid #FFE1D4",
    color: "#EF7E65",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "15rem",
    flexDirection: "row",
    marginTop: "1em",
    "&:hover": {
      filter: "brightness(104%)",
    },
  },
  textArea: {
    boxSizing: "border-box",
    fontFamily: "Fira Code, monospace",
    padding: "1em",
    borderRadius : "3px",
    border : "1px solid grey"
  },
  email : {
    marginBottom : "1em",
    fontFamily : "Fira Code, monospace",
    fontWeight : 600,

  }
});
const Notes = ({handleSubmit}) => {
  let props;
  const classes = useStyle(props);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} id="notes-form">
        <h2 className={classes.subtitle}>
          Additional Notes
        </h2>
        <div className={classes.column}>
          <div className={classes.email}>
            <label htmlFor="customer-email-input">Your Email :{" "}</label>
            <input type="text" id="customer-email-input" name="customer-email-input"/>
          </div>
          <textarea placeholder="Enter your note" id="customer-text" name="customer-text" className={classes.textArea}></textarea>
        </div>
      </form>
    </div>
  );
};
export default Notes;
