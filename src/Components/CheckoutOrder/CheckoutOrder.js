import React from 'react'
import classes from './CheckoutOrder.scss'

import Burger from '../Burger/Burger'

const CheckoutOrder = props => {
    return (
        <div className={classes.CheckoutOrder}>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <h2 className={classes.FormPrice}>Order price: {props.price}$</h2>
        </div>
    )
}

export default CheckoutOrder