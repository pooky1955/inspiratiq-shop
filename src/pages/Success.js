import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core";
import Layout from "../components/layout";
import SEO from "../components/seo";
import HappyCloud from "../images/HappyCloud.png";
import Shadow from "../images/HappyCloudShadow.png";
import Img from "gatsby-image";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyle = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleName: {
    color: "#F88A17",
    lineHeight: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Inspiratiq, monospace",
    fontWeight: "bold",
    fontSize: "3rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  text: {
    fontSize: "1rem",
    fontWeight: "500",
    maxWidth: "600",
    textAlign: "center",
    marginBottom: "1rem",
  },
  shopAgain: {
    fontWeight: "700",
    color: "#F38C6C",
  },
  "@keyframes floatAnimation": {
    from: { transform: "translate(0%,15px)" },
    to: { transform: "translate(0%,-15px)" },
  },
  shadow: {
    marginBottom: "1rem",
  },
  happyCloud: {
    animation: '1s $floatAnimation infinite linear',
    animationDirection: 'alternate',
    marginTop: '1rem',
    marginBottom: "2rem"
  },
});

const imagesQuery = graphql`
  query ImagesQuery {
    happyCloud : file(relativePath : {eq : "HappyCloud.png"}) {
      childImageSharp {
	fluid {
	  ...GatsbyImageSharpFluid_withWebp_tracedSVG
	}
      }
    },
      happyCloudShadow : file(relativePath : {eq : "HappyCloudShadow.png"}){
	childImageSharp {
	  fluid {
	    ...GatsbyImageSharpFluid_withWebp_tracedSVG
	  }
	}
      }
  }
`;
const SecondPage = () => {
  const classes = useStyle();
  const images = useStaticQuery(imagesQuery);
  //const size = phoneMatches ? "200px" : "300px"
  return (
    <Layout>
      <SEO title="Payment Success" />
      <div className={classes.container}>
        <div className={classes.titleName}>THANK YOU FOR YOUR ORDER!</div>
        <Img
          fluid={images.happyCloud.childImageSharp.fluid}
	  style={{ width: "50vw",maxWidth : "400px",minWidth : "230px" }}
	  className={classes.happyCloud}
	  durationFadeIn={50}
        />
        <Img
          fluid={images.happyCloudShadow.childImageSharp.fluid}
          className={classes.shadow}
	  style={{ width: "30vw",maxWidth : "400px",minWidth : "230px" }}
	  durationFadeIn={50}
        />

        <div className={classes.text}>
          Your order has been placed and is being processed. You will receive an
          email with the order details shortly.
        </div>
        <Link to="/" className={classes.shopAgain}>
          Shop again
        </Link>
      </div>
    </Layout>
  );
};

export default SecondPage;
