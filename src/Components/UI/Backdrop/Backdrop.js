import React from 'react'
import classes from './Backdrop.scss'


const Backdrop = (props) => {
    return props.show ? <div onClick={props.close} className={classes[props.classFor]} /> : null
}

export default Backdrop;