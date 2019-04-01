import { combineReducers } from 'redux'


import ordersReducer from './reducers/ordersReducer'
import burgerBuilderReducer from './reducers/burgerBuilderReducer'
import authFormReducer from './reducers/authFormReducer'

export default combineReducers({
    builder: burgerBuilderReducer,
    orders: ordersReducer,
    auth: authFormReducer
})