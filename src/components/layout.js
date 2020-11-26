import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Footer from './Footer'
import Header from './header'
import './layout.css'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'


import '@stripe/stripe-js' // https://github.com/stripe/stripe-js#import-as-a-side-effect

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
const windowExists = typeof window !== `undefined`
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (

  <CartProvider
    stripe={stripePromise}
    successUrl={`${windowExists ? window.location.origin : ""}/About`}
    
    cancelUrl={`${windowExists ? window.location.origin : ""}/`}
    currency="CAD"
    mode="client-only"
    // allowedCountries={["US", "GB", "CA"]}
    billingAddressCollection={true}
  >
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <Footer/>
        </div>
    </CartProvider> 
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
