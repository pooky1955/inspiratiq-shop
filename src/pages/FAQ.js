import React from 'react'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
const useStyle = makeStyles(theme => {
  //   debugger
  // console.log(theme)
  return {
    pageTitle: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '3rem',
      color: '#F88A17',
      lineHeight: '3.5rem',
      // color: theme.palette.secondary.main
    },
    category: {
      fontFamily: 'Inspiratiq, monospace',
      fontSize: '2.5rem',
    },
    question: {
      fontWeight: 'bold',
      marginBottom: '1rem',
      fontSize: '1.1rem',
    },
    answer: {
      textIndent: '1rem',
    },

    email: {
      // color: "#FFF",
      fontWeight: '700',
    },
    FAQ: {
      '& h1': {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
        color: '#F88A17',
        lineHeight: '3.5rem',
      },
      '& h2': {
        fontWeight: 'bold',
        fontFamily: 'inspiratiq',
        fontSize: '3rem',
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '2rem',
        maxWidth: '30rem',
        color: '#F88A17',
      },
      '& h3': {
        fontFamily: 'Fira Code',
        color: '#FC9C74',
      },
      '& a': {
        color: 'inherit',
      },
    },
  }
})
export const FAQ = ({ data }) => {
  const classes = useStyle()
  const { mdx } = data
  return (
    <Layout>
      <div className={classes.FAQ}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
      {/* <h1 className={classes.pageTitle}>FREQUENTLY ASKED QUESTIONS</h1>
      <div className={classes.bubbleText}>
        <img src={PinkBubble} height="280" width="750" />
        <div className={classes.subtitle}>
          If you have any issues or questions, please contact me at{' '}
          <span className={classes.email}>inspiratiq@hotmail.com</span> and I
          will be happy to answer!
        </div>
      </div>
      <h2 className={classes.category}>📦 Shipping</h2>
      <div className={classes.question}>WHEN WILL MY ORDER SHIP?</div>
      <div>
        All orders will be shipped within 1-2 business days from your order
        date.<br></br>
        Here are the <b>expected shipping times:</b>
      </div>
      <br></br>
      <ul>
        <li>1-4 business days for Canadian orders</li>
        <li>4-6 business days for US orders</li>
        <li>4-7 business days international orders</li>
      </ul>
      <div>
        Given the current situation, delays can be expected for certain
        packages. Thank you for your patience and understanding. Please contact
        me at <b>inspiratiq@hotmail.com</b> with your <b>order number</b> or{' '}
        <b>full name</b> if you haven’t received your package in these time
        frames.
      </div> */}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    mdx(frontmatter: { title: { eq: "FAQ" } }) {
      body
      frontmatter {
        title
      }
    }
  }
`
export default FAQ
