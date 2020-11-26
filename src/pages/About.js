import React from 'react'
import Layout from '../components/layout'
import { makeStyles} from '@material-ui/core/styles'
import {graphql} from "gatsby"
import InstagramIcon from '../images/instagram_pink.png'
import Img from "gatsby-image"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {useStaticQuery} from 'gatsby'

const useStyle = makeStyles({
  titleName: {
    color: '#F88A17',
    lineHeight: '3rem',
    display: "flex",
    alignItems: "center"
  },
  subtitle: {
    color: '#FC9C74',
    fontFamily: 'Inspiratiq',
  },
  self: props => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: props.flexDirection,
  }),
  titleBox: props => ({
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
  }),
  icon: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    display: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
const imagesQuery = graphql`
  query AboutQuery {
    portraitImage : file(relativePath : {eq :"Portrait.png"}) {
      id
      name
      childImageSharp {
	fluid(maxWidth : 1200){
	  ...GatsbyImageSharpFluid
	}
      }
    }
  }
`
const About = () => {
  let props
  const phoneMatches = useMediaQuery('(min-width: 800px)')
  const images = useStaticQuery(imagesQuery)
  const portraitFluid = images.portraitImage.childImageSharp.fluid
  // const desktopMatches = useMediaQuery('(max-width: 1200px')
  if (phoneMatches) {
    props = {
      flexDirection: 'row',
    }
  } else {
    props = {
      flexDirection: 'column',
    }
  }
  const classes = useStyle(props)
  return (
    <>
      <Layout>
        <br></br>
        <div className={classes.self}>
          <div classeName={classes.titleBox}>
            <div className={classes.text}>
              <h1 className={classes.titleName}>MARLENE LIANG</h1>
              <h2 className={classes.subtitle}>
                Artist based in Montreal, Canada
              </h2>
              <div>
                Hi! I’m Marlene and I am an artist based in Montreal, Canada. I
                love to work with gouache and watercolor to create bold and
                vibrant pieces. I often paint landscapes inspired by nature and
                add my own touch of magic to them (aka gold paint and
		sparkles!). <span role="img" aria-label="sparkle">✨</span>
              </div>
            </div>
            <br></br>
            <p>Thank you for checking out my shop!</p>
            <div className={classes.icon}>
              <a
                target="blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/inspiratiq/"
                id="logo"
              >
                <img src={InstagramIcon} height="60" alt="instagram icon"/>
              </a>
            </div>
          </div>
	  <Img fluid={portraitFluid} height="550" style={{width : "90rem",maxWidth : "50vw"}}/>
        </div>
      </Layout>
    </>
  )
}
export default About
