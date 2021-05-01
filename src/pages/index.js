import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductPage from '../components/ProductPage'
import Maintenance from '../components/Maintenance'

const IndexPage = ({location}) => {
  // alert(JSON.stringify(location))
  return (
    <Layout>
      <SEO title="Home" keywords={[`inspiratiq`,`shop`,`ecommerce`,`gatsby`,`art`,`prints`]} />
      <Maintenance/>
      </Layout>
  )

}

export default IndexPage
