import React, { Component } from 'react'
// import classes from './BurgerBuilder.scss'
import { connect } from 'react-redux'
import * as Builder from '../../redux/actions/burgerBuilderAction'

import axios from '../../axios_config/axios_config'
import _axios from 'axios'

import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'
import FetchError from '../../Components/UI/FetchError/FetchError'

import Modal from '../../Components/UI/Modal/Modal'
import withError from '../../Hoc/withError/withError'


const BurgerBuilder = class extends Component {
    isMount = false
    state = {
        ingredientPrice: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        purechasing: false,
        loading: false,
        prefetchDataError: false,
    }


    componentDidMount() {
        this.CancelTokenSource = _axios.CancelToken.source()
        this.isMount = true
    
        axios.get('https://burger-app-js.firebaseio.com/ingredientsPrice.json', {
                cancelToken: this.CancelTokenSource.token
            })
            .then(resp => {
                console.log(resp)
                if (this.isMount) {
                    this.setState({
                        ingredientPrice: resp.data
                    })
                }
            })
            .catch(err => {
                if (this.isMount) {
                    this.setState({
                        prefetchDataError: true
                    })
                }
            })
    }

    componentWillUnmount() {
        this.isMount = false
        this.CancelTokenSource && this.CancelTokenSource.cancel()
    }
    

    retryFetchDataHandler = () => {
        axios.get('https://burger-app-js.firebaseio.com/ingredientsPrice.json')
            .then(resp => {
                console.log(resp)
                this.setState({
                    ingredientPrice: resp.data,
                    prefetchDataError: false
                })
            })
            .catch(err => {
                this.setState({
                    prefetchDataError: true
                })
            })
    }

    
    newIngredientHandler = type => {
        this.props.onAddIngredient(type, this.state.ingredientPrice[type])
    }


    removeIngredientHandler = type => {      
        this.props.onRemoveIngredient(type, this.state.ingredientPrice[type])
    }


    purechasingHandler = () => {
        this.setState({
            purechasing: !this.state.purechasing
        })
    }

    continueOrderHandler = () => {
        this.props.history.push('/checkout-form')
    }

    render() {
        console.log('Props', this.props)
        let modal = (
            <Modal showModal={this.state.purechasing}
                   closeModal={this.purechasingHandler}
                >
                <OrderSummary
                    ingredients={this.props.ingredients}
                    closeModal={this.purechasingHandler}
                    continueOrder={this.continueOrderHandler}
                    totalPrice={this.props.totalPrice}
                />
            </Modal>
        )
        
        if (this.state.loading) {
            modal = (
                <Modal showModal={this.state.purechasing}
                    closeModal={this.purechasingHandler}
                    hideForLoader={this.state.loading}
                    >
                    <OrderLoader />
                </Modal>
            )
        } 
        
        const controlBurger = (
            <>
            { this.state.purechasing ? modal : null  }
                <Burger  ingredients={this.props.ingredients} />
                <BuildControls
                    addIngredFunc={this.newIngredientHandler}
                    deleteInredFunc={this.removeIngredientHandler}
                    totalPrice={this.props.totalPrice}
                    isOrdered={this.props.totalPrice > 0}
                    purchasingStart={this.purechasingHandler}
                    clearBurger={this.props.onClearBurger}
                />
            </>
        )

        return (
            <>
                {!this.state.prefetchDataError ? controlBurger : <FetchError retryFunc={this.retryFetchDataHandler}/>}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.builder.ingredients,
        totalPrice: state.builder.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type, price) => dispatch(Builder.addIngredient(type, price)),
        onRemoveIngredient: (type, price) => dispatch(Builder.removeIngredient(type, price)),
        onClearBurger: () => dispatch(Builder.clearBurger())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, axios))