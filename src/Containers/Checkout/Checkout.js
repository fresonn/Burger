import React, { useState, useEffect } from 'react'
import classes from './Checkout.scss'

import CheckoutOrder from '../../Components/Order/CheckoutOrder'
import ContactData from '../ContactData/ContactData'

const Checkout = props => {

    const [ingredients, changeIngredients] = useState({
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        })

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const newIngredients = {}
        for (let _option of query.entries()) {
            newIngredients[_option[0]] = +_option[1]
        }

        changeIngredients(newIngredients)
    }, [])

    return (
        <div className={classes.CheckoutWrapper}>
            <CheckoutOrder
                ingredients={ingredients}
            />
            <ContactData />
        </div>
    )
}

export default Checkout