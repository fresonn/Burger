import React from 'react'
import classes from './Button.scss'


const Button = (props) => {
    const {classFor, clickFunc, type} = props
    return (
        <button
            type={type}
            onClick={clickFunc}
            className={classes[classFor]}>
            { props.children }
        </button>
    )
}

export default Button