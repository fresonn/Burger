import React from 'react'
import classes from './CheckoutOrder.scss'

import Burger from '../Burger/Burger'

const CheckoutOrder = props => {
    return (
        <div className={classes.CheckoutOrder}>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
        </div>
    )
}

export default CheckoutOrder