import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductPage from '../components/ProductPage'

const IndexPage = ({ location }) => {
    // alert(JSON.stringify(location))
    return (
        <Layout>
            <SEO
                title="Home"
                keywords={[
                    `inspiratiq`,
                    `shop`,
                    `ecommerce`,
                    `gatsby`,
                    `art`,
                    `prints`,
                ]}
            />
            <ProductPage
                showCart={location.state ? location.state.showCart : false}
                showItems={location.state ? location.state.showItems : false}
                showMain={location.state ? location.state.showMain : false}
            ></ProductPage>
        </Layout>
    )
}

export default IndexPage
