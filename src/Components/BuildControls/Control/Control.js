import React from 'react'
import classes from './Control.scss'

const Control = props => {
    return (
        <div className={classes.Control}>
            <div className={classes.Label}>{props.label}</div>
            <button onClick={props.addIngredFunc} className={classes.moreButton}>Add</button>
            <button onClick={props.deleteInredFunc} className={classes.lessButton}>Less</button>
        </div>
    )
}


export default Control