import React from 'react'
import classes from './Button.scss'


const Button = (props) => {
    const {classFor, clickFunc, type, disabled} = props
    return (
        <button
            type={type}
            onClick={clickFunc}
            className={classes[classFor]}
            disabled={disabled}
        >
            { props.children }
        </button>
    )
}

export default Button