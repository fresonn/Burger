import * as AT from '../actionType'
import axios from '../../axios_config/axios_config'


export const receivedOrders = (orders) => {
    return {
        type: AT.RECEIVED_USER_ORDERS,
        payload: orders
    }
}

export const orderError = () => {
    return {
        type: AT.ERROR_RECEIVED_ORDERS
    }
}

export const clearOrders = () => {
    return {
        type: AT.CLEAR_ORDERS_BEFORE_UNMOUNT
    }
}

export const fetchOrders = (token, userId) => {
    return (dispatch) => {        
        axios.get('/orders.json?auth=' + token + `&orderBy="userId"&equalTo="${userId}"`) // для firebase '&' = фильтр
            .then(res => {
                const received = []
                for (const key in res.data) {
                    received.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(receivedOrders(received))
            })
            .catch(err => {
                dispatch(orderError())
        })
    }
}