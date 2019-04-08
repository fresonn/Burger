import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as Redux } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import rootReducer from './redux/rootReducer'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

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