import React from 'react'
import PinkBubble from '../../images/pinkBubble.png'
import PhoneBubble from '../../images/pinkBubblePhone.png'
import { makeStyles, useMediaQuery } from '@material-ui/core'

const useStyle = makeStyles({
  bubbleText:{
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: "0.95rem"

  },
  subtitle: props => ({
    maxWidth: props.maxWidth,
    position: 'absolute',
    textAlign: 'center',

  }),
  email: {
    fontWeight: 800,
    color: 'inherit',
  },
})
export const TextBubble = () => {
  let props;
  const desktopMatches = useMediaQuery('(min-width: 739px)')
  if (desktopMatches){
    props = {
      maxWidth: "30rem"
    }
  }
  else{
    props = {
      maxWidth: "19rem"
    }
  }
  const classes = useStyle(props)

  return (
    <div className={classes.bubbleText}>
      <img src={desktopMatches? PinkBubble : PhoneBubble} alt="text bubble" height={desktopMatches? "280": "200"} width={desktopMatches? "750" : "360"}/>
      <div className={classes.subtitle}>
        If you have any issues or questions, please contact me at{' '}
        <span className={classes.email}>
          <a href="mailto:inspiratiq@hotmail.com" className={classes.email}>
            inspiratiq@hotmail.com
          </a>{' '}
        </span>
        and I will be happy to answer!
      </div>
    </div>
  )
}
export default TextBubble
