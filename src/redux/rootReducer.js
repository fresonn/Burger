import { combineReducers } from 'redux'

import orderFormReducer from './reducers/orderFormReducer'
import ordersReducer from './reducers/ordersReducer'
import burgerBuilderReducer from './reducers/burgerBuilderReducer'

export default combineReducers({
    builder: burgerBuilderReducer,
    form: orderFormReducer,
    orders: ordersReducer
})