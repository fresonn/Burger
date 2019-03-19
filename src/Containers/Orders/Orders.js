import React from 'react'
import classes from './Orders.scss'
import { useState, useEffect } from 'react'
import axios from '../../axios_config/axios_config'
import _axios from 'axios'

import Order from '../../Components/Order/Order'
import FetchError from '../../Components/UI/FetchError/FetchError'
import OrderLoader from '../../Components/UI/Loaders/OrderLoader/OrderLoader'
import EmptyContainer from '../../Components/UI/EmptyContainer/EmptyContainer'



const Orders = props => {

    const [orders, newOrders] = useState([])
    const [loading, changeLoading] = useState(true)
    const [error, changeError] = useState(null)

    const getReceivedOrders = () => {
        axios.get('/orders.json')
            .then(res => {
                const receivedOrders = []
                for (const key in res.data) {
                    receivedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(receivedOrders)
                changeError(null)
                changeLoading(false)
                newOrders(receivedOrders)
            })
            .catch(err => {
                changeLoading(false)
                changeError(err)
            })
    }

    let CancelTokenSource = null

    useEffect(() => {

        CancelTokenSource = _axios.CancelToken.source();

        axios.get('/orders.json', {
                cancelToken: CancelTokenSource.token
            })
            .then(res => {
                const receivedOrders = []
                for (const key in res.data) {
                    receivedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(receivedOrders)
                changeError(null)
                changeLoading(false)
                newOrders(receivedOrders)
            })
            .catch(err => {
                changeLoading(false)
                changeError(err)
            })
        return () => {
            console.log(CancelTokenSource)
            CancelTokenSource.cancel()
            CancelTokenSource && CancelTokenSource.cancel()
        }
    }, [])

    const readyOrders = orders.map(order => {
        return (
            <Order 
                date={order.date} 
                key={order.id}
                ingredients={order.ingredients}
             />
        )
    })


    return (
        <div className={classes.Orders}>
            { loading ? <OrderLoader /> : null }
            { error ? <FetchError retryFunc={getReceivedOrders}>{error.message}</FetchError> : null }
            {orders.length === 0 && error === null && !loading ? <EmptyContainer /> : readyOrders }
        </div>
    )
}

export default Orders