import React from 'react'
import classes from './Button.scss'

const Button = (props) => {

    const {classFor, clickFunc} = props

    return (
        <button
            onClick={clickFunc}
            className={classes[classFor]}>
            { props.children }
        </button>
    )
}

export default Button