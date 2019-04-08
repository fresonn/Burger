import React from 'react'
import classes from './OrderResultBox.scss'
import ErrorImage from '../../../../assets/images/error-image.svg'

const OrderResultBox = props => {
    return (
        <div className={classes.statusBox}>
            <img src={ErrorImage} alt="Status icon"/>
            <h4 className={classes.statusTitle}>{props.children}</h4>
            <p className={classes.statusDescription}>Please try again!</p>
        </div>
    )
}


export default OrderResultBox