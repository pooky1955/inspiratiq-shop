import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
    footer: {
    
    }
})
export const Footer=()=>{
    const classes = useStyle()
    return(

        <div className={classes.footer}>
        </div>
        )
}

export default Footer;