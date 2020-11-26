import React from 'react'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core'
import Layout from '../components/layout'
import SEO from '../components/seo'
import HappyCloud from '../images/HappyCloud.png'
import Shadow from '../images/HappyCloudShadow.png'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleName: {
    color: '#F88A17',
    lineHeight: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Inspiratiq',
    fontWeight: 'bold',
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: "center"
  },
  text: {
    fontSize: '1rem',
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  shopAgain: {
    fontWeight: '700',
    color: '#F38C6C',
  },
  '@keyframes floatAnimation': {
    from: { transform: 'translate(0%,2%)' },
    to: { transform: 'translate(0%,-2%)' },
  },
  cloudAndShadow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: "1.5rem"
  },
  happyCloud: {
    animation: '1s $floatAnimation infinite  cubic-bezier(0.37, 0, 0.63, 1)',
    animationDirection: 'alternate',
    transform: 'translate(90%)',
    marginTop: '1rem',
    marginBottom: "2rem"
  },
})
const SecondPage = () => {
  const phoneMatches = useMediaQuery('(max-width: 600px)')
  const classes = useStyle()
  return (
    <Layout>
      <SEO title="Payment Success" />
      <div className={classes.container}>
        <div className={classes.titleName}>THANK YOU FOR YOUR ORDER!</div>
        <div className={classes.cloudAndShadow}>
        <img src={HappyCloud} alt="happy cloud" className={classes.happyCloud} height={phoneMatches ? "200" : "300"}/>
        <img src={Shadow} alt="happy cloud shadow" width={phoneMatches ? "200" : "300"}/>
        </div>
        <div className={classes.text}>
          Your order has been placed and is being processed. You will receive an
          email with the order details shortly.
        </div>
        <Link to="/" className={classes.shopAgain}>
          Shop again
        </Link>
      </div>
    </Layout>
  )
}

export default SecondPage
