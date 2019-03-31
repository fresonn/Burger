import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './index.scss'

// HOC
import Layout from './Hoc/Layout/Layout'
import { connect } from 'react-redux'

// Components
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'

const App = class extends Component {


    render() {
        const { totalPrice } = this.props
        return (
            <Layout>
                <Switch>
                    <Route exact path={'/'} component={BurgerBuilder} />
                    <Route path={'/orders'} component={Orders} />
                    <Route path={'/auth'} component={Auth}/>
                    { totalPrice ? <Route path={'/checkout-form'} component={Checkout} /> : <Redirect to='/'/>}
                </Switch>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalPrice: state.builder.totalPrice
    }
}

export default connect(mapStateToProps)(App)