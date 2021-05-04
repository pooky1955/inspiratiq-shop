import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  title: {
      lineHeight: '3rem',
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textDecoration: "underline",
      textAlign: "center",
      marginBottom: "1rem"
    },
    text: {
        maxWidth: "50%",
        fontWeight: "500",
        textAlign: "center",
        color: '#F88A17',
        fontSize: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  }
})

const Maintenance = () => {
    const classes = useStyle();
    return(
        <>
        <div className={classes.container}>
        <div className={classes.title}>Shop Under Maintenance</div>
        <div className={classes.text}>We'll be back soon!</div>
        </div>
        </>
    )
}

export default Maintenance
