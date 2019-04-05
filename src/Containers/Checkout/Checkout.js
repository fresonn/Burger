import React, { useState, useEffect } from 'react'
import classes from './Checkout.scss'
import axios from '../../axios_config/axios_config'
import { connect } from 'react-redux'
import dataFns from 'date-fns'
import CheckoutOrder from '../../Components/CheckoutOrder/CheckoutOrder'
import ContactData from '../ContactData/ContactData'

import FetchError from '../../Components/UI/FetchError/FetchError'

import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'

const Checkout = props => {
    const [loading, changeLoading] = useState(false)
    const [error, changeError] = useState(null)

    useEffect(() => {
        document.title = 'Continue order'
    }, [])

    const sendOrderHAndler = userInfo => {
        changeLoading(true)
    
        const userOrder = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            data: userInfo,
            date: dataFns.format(new Date(), 'MM.DD.YYYY'),
            time: new Date(),
            userId: props.userId

        }
        axios.post(`/orders.json?auth=${props.token}`, userOrder)
            .then(resp => {
                changeLoading(false)
                props.history.replace('/orders')
            })
            .catch(err => {
                changeLoading(false)
                changeError(err)
            })
    }

    const CheckoutComp = (
            <div className={classes.CheckoutWrapper}>
            <Backdrop classFor={'OrderFormBackdrop'} show={loading} />
            { loading ? <OrderLoader /> : null }
            <CheckoutOrder
                price={props.totalPrice}
                ingredients={props.ingredients}
            />
            <ContactData sendFunc={sendOrderHAndler}/>
        </div>
    )
    return (
        <div className={classes.MainBackground}>
        { error ? <FetchError showButton={false}>{error.message}</FetchError> : CheckoutComp }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.builder.ingredients,
        totalPrice: state.builder.totalPrice,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(Checkout)