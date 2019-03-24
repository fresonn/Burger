import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as Redux } from 'react-redux'
import { createStore } from 'redux'


import App from './App'
import rootReducer from './redux/rootReducer'

const store = createStore(rootReducer)

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