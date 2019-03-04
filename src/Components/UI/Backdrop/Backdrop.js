import React from 'react'
import classes from './Backdrop.scss'

const Backdrop = (props) => {
    return props.showModal ? <div onClick={props.closeModal} className={classes.Backdrop} /> : null
}

export default Backdrop;