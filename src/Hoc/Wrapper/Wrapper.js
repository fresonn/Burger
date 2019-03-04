import React from 'react'
import classes from './Wrapper.scss'


const Wrapper = props => {
    return (
        <div className={classes.Wrapper}>
            {props.children}
        </div>
    )
}

export default Wrapper;