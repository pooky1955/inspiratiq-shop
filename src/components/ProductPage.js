import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Products from './Products/Products'
import CartButton from '../components/CartButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyle = makeStyles({
  browse: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  browseBy: {
    paddingRight: '1rem',
  },
  topContainer: props=>({
    display: "flex",
    flexDirection: props.flexDirection,
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  title: {
    color: '#F88A17',
    marginBottom: '2rem',
  },

  selectMenu: {
    padding: '.8rem',
    background: '#FFFDFB',
    border: '1px solid black',
    // width : "40vw",
    borderRadius: '0.5rem',
    '&::-ms-expand': {
      display: 'none',
      appearance: 'none',
    },
    'select::-ms-expand': {
      display: 'none',
    },
  },
  selectContainer: {
    position: 'relative',
    '& select': {
      appearance: 'none',
      width: '18rem',
    },
    '&:after': {
      content: "'< >'",
      color: 'black',
      position: 'absolute',
      pointerEvents: 'none',
      transform: 'rotate(90deg)',
      right: '3px',
      top: '34%',
    },
  },
  returnButton: {
    border: 'none',
    background: 'none',
  },
  returnText: {
    '&:hover': {
      filter: 'brightness(150%)',
    },
  },
  cartNavigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
})

export const ProductPage = () => {
  let props
  const desktopMatches = useMediaQuery('(min-width: 700px)')
  const phoneMatches = useMediaQuery('(min-width: 600px')

  if (desktopMatches) {
    props={
      flexDirection: "row"
    }
  }
  else {
    props={
      flexDirection: "column"
    }
  }
  const classes = useStyle(props)
  const [collection, setCollection] = useState('')
  const handleChange = e => {
    setCollection(e.target.value)
  }
  

  return (
    <>
    <div className={classes.titleContainer}>
      <h1 className={classes.title}>PRINTS</h1>
      {!desktopMatches && <CartButton/>}
    </div>
      <div className={classes.topContainer}>
        <div className={classes.browse}>
          {phoneMatches && <div className={classes.browseBy}>Browse by</div>}
          <div className={classes.selectContainer}>
            <select
              value={collection}
              onBlur={handleChange}
              className={classes.selectMenu}
            >
              <option value="">All Prints</option>
              <option value="Studio Ghibli">Studio Ghibli Collection</option>
              <option value="Wanderlust">Wanderlust Collection</option>
            </select>
          </div>
        </div>
       {desktopMatches && <CartButton/>}
      </div>
      <div>
        <Products
          collection={collection}
          displayProduct={() => {
	    
          }}
        />
      </div>
    </>
  )
}

export default ProductPage
