import React from 'react'
import classes from './Wrapper.scss'
import AddContainer from '../../Components/AddContainer/AddContainer'

const Wrapper = props => {
    return (
        <>
        <div className={classes.Wrapper}>
            {props.children}
        </div>
        <AddContainer />
        </>
    )
}

export default Wrapper;