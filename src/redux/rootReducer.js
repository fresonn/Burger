import { combineReducers } from 'redux'


import ordersReducer from './reducers/ordersReducer'
import burgerBuilderReducer from './reducers/burgerBuilderReducer'

export default combineReducers({
    builder: burgerBuilderReducer,
    orders: ordersReducer
})