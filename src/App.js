import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './index.scss'
import { authCheckSession } from './redux/actions/authAction'

// HOC
import Layout from './Hoc/Layout/Layout'
import { connect } from 'react-redux'

// Components
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import LogOut from './Containers/Auth/LogOut/LogOut'

const App = class extends Component {

    componentDidMount() {
        this.props.onCheckAutoLogin()
    }

    render() {
        const { totalPrice, isAuthenticated } = this.props
        return (
            <Layout>
                <Switch>
                    <Route exact path={'/'} component={BurgerBuilder} />
                    <Route path={'/auth'} component={Auth}/>
                    <Route path={'/logout'} component={LogOut} />
                    { isAuthenticated !== null ? <Route path={'/orders'} component={Orders} /> : <Redirect to='/'/> }
                    { totalPrice ? <Route path={'/checkout-form'} component={Checkout} /> : <Redirect to='/'/>}
                </Switch>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        totalPrice: state.builder.totalPrice,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckAutoLogin: () => dispatch(authCheckSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)