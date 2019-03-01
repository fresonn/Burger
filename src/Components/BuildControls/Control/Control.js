import React from 'react'
import classes from './Control.scss'

const Control = props => {
    return (
        <div className={classes.Control}>
            <div>{props.label}</div>
            <button>Less</button>
            <button>More</button>
        </div>
    )
}


export default Control