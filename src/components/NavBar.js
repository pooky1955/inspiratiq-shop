import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'


const useStyle = makeStyles({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.25rem',
    // color: "#FC9C74",
  },
  tab: {
    marginRight: '2rem',
    marginLeft: '2rem',
    textDecoration: 'none',
  },
  linkStyle: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#FC9C74',
    '&:link,&:visited,&:hover': {
      textDecoration: 'none',
      color: '#FC9C74',
    },
  },
})
export const NavBar = () => {
  const classes = useStyle()
  return (
    <>
      <div className={classes.navbar}>
        <Link
          to="/About"
          className={classes.linkStyle}
          activeClassName={classes.activeStyle}
        >
          <div className={classes.tab}>ABOUT</div>
        </Link>
        <Link
          to="/"
          replace={true}
          state={{showCart : false,showItems : false,showMain : true}}
          className={classes.linkStyle}
        >
          <div className={classes.tab}>SHOP</div>
        </Link>
            <Link to="/FAQ" className={classes.linkStyle}>
          <div className={classes.tab}>FAQ</div>
        </Link>
      </div>
    </>
  )
}

export default NavBar
