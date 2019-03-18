import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'


import App from './App'

const application = (
    <Router>
        <App />
    </Router>
)

ReactDOM.render(
    application,
    document.querySelector('#root')
)