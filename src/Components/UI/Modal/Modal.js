import React from 'react'
import classes from './Modal.scss'

const Modal = props => {
    return (
        <div className={classes.Modal}>
            { props.children }
        </div>
    )
}

export default Modal