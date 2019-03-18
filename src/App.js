import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './index.scss'

// HOC
import Layout from './Hoc/Layout/Layout'

// Components
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'


const App = class extends Component {


    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path={'/'} component={BurgerBuilder} />
                    <Route path={'/checkout-form'} component={Checkout} />
                </Switch>
            </Layout>
        )
    }
}

export default App