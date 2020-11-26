import React from 'react'
import { makeStyles } from '@material-ui/core'
import Layout from '../components/layout'
import SEO from '../components/seo'

const useStyle = makeStyles({
  title: {
    color: '#F88A17',
    lineHeight: '3rem',
    display: "flex",
    alignItems: "center"
  },
  text: {
    maxWidth: "50%",
    fontWeight: "500",
    textAlign: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
})
export const NotFoundPage = () => {
  const classes = useStyle()
  return(
    <Layout>
    <SEO title="404: Not found" />
    <div className={classes.container}>
    <h1 className={classes.title}>NOT FOUND</h1>
    <p className={classes.text}>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
    )
}

export default NotFoundPage
