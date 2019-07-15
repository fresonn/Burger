import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Builder from '../../redux/actions/burgerBuilderAction'

import axios from '../../axios_config/axios_config'

import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'
import FetchError from '../../Components/UI/FetchError/FetchError'
import Modal from '../../Components/UI/Modal/Modal'
import withError from '../../Hoc/withError/withError'


class BurgerBuilder extends Component {

    componentDidMount() {
        this.props.onInitPrice()
        document.title = 'Burger'
    }

    componentWillUnmount() {
        this.props.onUnmountPurchasing()
    }
    
    
    continueOrderHandler = () => {
        this.props.history.push('/checkout-form')
    }

    render() {

        let modal = (
            <Modal showModal={this.props.purechasing}
                   closeModal={this.props.onChangePurechasing}
                >
                <OrderSummary
                    ingredients={this.props.ingredients}
                    closeModal={this.props.onChangePurechasing}
                    continueOrder={this.continueOrderHandler}
                    totalPrice={this.props.totalPrice}
                />
            </Modal>
        )
        
        if (this.props.loading) {
            modal = (
                <Modal showModal={this.props.purechasing}
                    closeModal={this.props.onChangePurechasing}
                    hideForLoader={this.props.loading}
                    >
                    <OrderLoader />
                </Modal>
            )
        } 
        
        const controlBurger = (
            <>
            { this.props.purechasing ? modal : null  }
                <Burger  ingredients={this.props.ingredients} />
                <BuildControls
                    addIngredFunc={this.props.onAddIngredient}
                    deleteInredFunc={this.props.onRemoveIngredient}
                    totalPrice={this.props.totalPrice}
                    isOrdered={this.props.totalPrice > 0}
                    purchasingStart={this.props.onChangePurechasing}
                    clearBurger={this.props.onClearBurger}
                    isAuthWithToken={this.props.isAuthWithToken}
                />
            </>
        )

        return (
            <>
                {!this.props.prefetchDataError ? controlBurger : <FetchError retryFunc={this.props.onRetryInitPrice}/>}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.builder.ingredients,
        totalPrice: state.builder.totalPrice,
        loading: state.builder.loading,
        prefetchDataError: state.builder.prefetchDataError,
        purechasing: state.builder.purechasing,
        isAuthWithToken: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) => dispatch(Builder.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(Builder.removeIngredient(type)),
        onClearBurger: () => dispatch(Builder.clearBurger()),
        onInitPrice: () => dispatch(Builder.fetchAfterMounting()),
        onRetryInitPrice: () => dispatch(Builder.retryFetchData()),
        onChangePurechasing: () => dispatch(Builder.stopPurechasing()),
        onUnmountPurchasing: () => dispatch(Builder.defaultPurechasing())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios))