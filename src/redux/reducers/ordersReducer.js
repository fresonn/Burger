import * as AT from '../actionType'

const initialState = {
    orders: [],
    loading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AT.RECEIVED_USER_ORDERS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...action.payload]
            }
        case AT.ERROR_RECEIVED_ORDERS:
            return {
                ...state,
                loading: false,
                error: true
            }
        case AT.CLEAR_ORDERS_BEFORE_UNMOUNT:
            return {
                orders: [],
                loading: true,
                error: null
            }
        default:
            return state
    }
}