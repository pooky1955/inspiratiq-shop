import React, { useState } from 'react'
import Img from 'gatsby-image'
import { Video } from 'gatsby-video'
import { makeStyles } from '@material-ui/styles'
import { formatPrice } from '../components/Products/ProductCard'
import { useShoppingCart } from 'use-shopping-cart'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import CartButton from '../components/CartButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Select } from '../components/Select'

const useStyle = makeStyles({
    itemContainer: styleProps => ({
        display: 'flex',
        flexDirection: styleProps.flexDirection,
        marginTop: '1rem',
        alignItems: styleProps.alignItems,
    }),
    itemName: {
        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#F88A17',
        marginBottom: '1rem',
    },
    itemDescription: {
        display: 'flex',
        flexDirection: 'column',
        //marginLeft: "2rem",
        lineHeight: '2rem',
    },
    price: {
        marginBottom: '1rem',
        fontSize: '1.25rem',
        fontWeight: '600',
    },
    addCartButton: {
        width: '70%',
        maxWidth: '13rem',
        padding: '0.5rem 0rem',
        background: '#FFCDB7',
        border: '2px solid #FFE1D4',
        color: '#F38C6C',
        marginBottom: '1rem',
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        '&:hover': {
            filter: 'brightness(104%)',
        },
    },
    cart: {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    cartLogo: {
        marginRight: '.5rem',
    },

    cartButton: {
        padding: '.5rem',
        background: '#FFB672',
        border: '2px solid #FFE1D4',
        color: '#FFF',
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //maxWidth : "30px",
        '&:hover': {
            filter: 'brightness(104%)',
        },
    },

    link: {
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1.25rem',
        color: '#F88A17',
    },
    shopNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        //maxWidth: '85%',
    },
    imageContainer: {
        width: '80rem',
        maxWidth: '450px',
        marginBottom: '2rem',
    },
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        padding: '1rem 0rem 1rem 0rem',
        gridGap: '20px',
    },
    mainContainer: styleProps => ({
        display: 'flex',
        flexDirection: styleProps.flexDirection,
        alignItems: 'center',
    }),
    leftSide: {},
    rightSide: styleProps => ({
        marginLeft: styleProps.phoneMatches ? 'auto' : '2rem',
    }),
    cartContainer: {
        //width: "50%",
        minWidth: '100px',
        maxWidth: '250px',
    },
    topContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },
    option: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
    },
    soldOutText: {
        fontSize: '1.5rem',
        color: '#F88A17',
        fontWeight: '700',
    },
})

export const ProductItem = props => {
    let styleProps
    const phoneMatches = useMediaQuery('(max-width: 768px)')
    const [isAdded, setIsAdded] = useState(false)

    if (phoneMatches) {
        styleProps = {
            flexDirection: 'column',
            alignItems: 'center',
            phoneMatches,
        }
    } else {
        styleProps = {
            flexDirection: 'row',
            alignItems: 'flex-start',
            phoneMatches,
        }
    }
    const classes = useStyle(styleProps)
    const { products } = props
    let initialProduct = products[0]
    const initialProductName = initialProduct.name
    const [product, setProduct] = useState(initialProduct)
    const differentProducts = products.filter(product => product.nickname)
    const selectData = differentProducts.map(product => {
        const { nickname, original } = product
        const title = original.active ? nickname : `(SOLD OUT) : ${nickname}`
        return { value: nickname, name: title }
    })
    const showSelect = differentProducts.length > 0

    const handleChange = e => {
        const productName = e.target.value
        let matchProduct
        if (productName === initialProductName) {
            matchProduct = initialProduct
        } else {
            matchProduct = products.filter(
                ({ nickname }) => nickname === productName
            )[0]
        }
        setProduct(matchProduct)
    }
    const { addItem } = useShoppingCart()
    let fluidImg
    if (product.gatsbyImages[0]) {
        fluidImg = product.gatsbyImages[0].childImageSharp.fluid
    }
    const handleClick = () => {
        addItem(product, 1)
        setIsAdded(true)
        setTimeout(() => {
            setIsAdded(false)
        }, 700)
    }

    const convertImg = fluid => (
        <Img fluid={fluid} durationFadeIn={100} style={{ width: '100%' }} />
    )

    const convertVid = video => {
        debugger
        return <Video autoPlay muted loop sources={[video.mp4]} />
    }
    const allImages = product.gatsbyImages
        ? Object.entries(product.gatsbyImages)
              .filter(
                  ([index, val]) =>
                      index !== '0' && val['childImageSharp'] !== null
              )
              .map(([_, image]) => {
                  return convertImg(image.childImageSharp.fluid)
              })
        : []
    // alert(product.videos)
    // const allVids = product.videos
    //     ? Object.entries(product.videos).map(([_, vid]) => {
    //           debugger
    //           return convertVid(vid.childVideoFfmpeg)
    //       })
    //     : []
    const allVids = []
    return (
        <div>
            <div className={classes.topContainer}>
                <div className={classes.shopNav}>
                    <Link to="/" className={classes.link}>
                        <div>{'<'} SHOP</div>
                    </Link>
                </div>
                <div className={classes.cartContainer}>
                    <CartButton />
                </div>
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.leftSide}>
                    <div className={classes.itemContainer}>
                        <div className={classes.imageContainer}>
                            <Img
                                fluid={fluidImg}
                                durationFadeIn={100}
                                style={{ width: '90%', margin: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.itemDescription}>
                        <div className={classes.itemName}>{product.name}</div>
                        <div className={classes.price}>
                            {' '}
                            {formatPrice(product.price, product.currency)}
                        </div>
                        {product.metadata.soldOut === 'true' ||
                        !product.original.active ? (
                            <div className={classes.soldOutText}>Sold out</div>
                        ) : isAdded ? (
                            <button className={classes.addCartButton}>
                                Added!
                            </button>
                        ) : (
                            <button
                                className={classes.addCartButton}
                                onClick={handleClick}
                            >
                                Add to cart
                            </button>
                        )}

                        {showSelect && (
                            <>
                                <span className={classes.option}>Options</span>
                                <Select
                                    data={selectData}
                                    value={
                                        product.nickname
                                            ? product.nickname
                                            : product.name
                                    }
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <div>
                            {product.metadata.additionalDescription
                                .split('\\n')
                                .map(sentence => {
                                    return (
                                        <>
                                            {' '}
                                            {sentence} <br />{' '}
                                        </>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.gallery}>{allImages}</div>
            <div className={classes.gallery}>{allVids}</div>
        </div>
    )
}

//export const pageQuery = graphql`
//`

export const ProductPage = props => {
    if (props.pageResources) {
        const products = props.pageResources.json.pageContext.products
        return (
            <Layout>
                <ProductItem products={products} />
            </Layout>
        )
    } else {
        return null
    }
}

export default ProductPage
