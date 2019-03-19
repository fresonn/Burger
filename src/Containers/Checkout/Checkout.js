import React, { useState, useEffect } from 'react'
import classes from './Checkout.scss'
import axios from '../../axios_config/axios_config'

import CheckoutOrder from '../../Components/CheckoutOrder/CheckoutOrder'
import ContactData from '../ContactData/ContactData'

import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'

const Checkout = props => {

    const [ingredients, changeIngredients] = useState({
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        })

    const [loading, changeLoading] = useState(false)


    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const newIngredients = {}
        for (let _option of query.entries()) {
            newIngredients[_option[0]] = +_option[1]
        }

        changeIngredients(newIngredients)
    }, [])





    const sendOrderHAndler = event => {
        event.preventDefault()
        changeLoading(true)
        const userOrder = {
            ingredients: ingredients,
            // price: this.state.totalPrice,
            date: new Date().toLocaleTimeString()
        }
        axios.post('/orders.json', userOrder) ////
            .then(resp => {
                changeLoading(false)
                props.history.replace('/orders')
            })
            .catch(err => {
                changeLoading(false)
            })
    }

    return (
        <div className={classes.CheckoutWrapper}>
            <Backdrop classFor={'OrderFormBackdrop'} show={loading} />
            { loading ? <OrderLoader /> : null }
            <CheckoutOrder
                ingredients={ingredients}
            />
            <ContactData sendFunc={sendOrderHAndler}/>
        </div>
    )
}

export default Checkout