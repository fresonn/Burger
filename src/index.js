import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as Redux } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import rootReducer from './redux/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

const application = (
    <Redux store={store}>
        <Router>
            <App />
        </Router>
    </Redux>
)

ReactDOM.render(
    application,
    document.querySelector('#root')
)