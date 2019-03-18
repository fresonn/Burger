import React, { Component } from 'react'
// import classes from './BurgerBuilder.scss'

import axios from '../../axios_config/axios_config'

import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'
import FetchError from '../../Components/UI/FetchError/FetchError'

import Modal from '../../Components/UI/Modal/Modal'
import withError from '../../Hoc/withError/withError'


const BurgerBuilder = class extends Component {
    state = {
        ingredientPrice: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        ingredients: {
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 0,
        isOrdered: false,
        purechasing: false,
        loading: false,
        prefetchDataError: false
    }


    componentDidMount() {
        axios.get('https://burger-app-js.firebaseio.com/ingredientsPrice.json')
            .then(resp => {
                console.log(resp)
                this.setState({
                    ingredientPrice: resp.data
                })
            })
            .catch(err => {
                this.setState({
                    prefetchDataError: true
                })
            })
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

    updateOrder = (ingredients) => {
        const totalSumm = Object.values(ingredients)
            .reduce((count, num) => {
                return count + num
            }, 0)
        this.setState({
            isOrdered: totalSumm > 0
        })
    }

    
    newIngredientHandler = type => {
        const ingredients = {
            ...this.state.ingredients
        }
        const ingredientPrice = this.state.ingredientPrice[type]
        let totalPrice = this.state.totalPrice
            totalPrice = (totalPrice * 10 + ingredientPrice * 10) / 10
        ingredients[type]++
        this.setState({
            ingredients,
            totalPrice
        })
        this.updateOrder(ingredients)
    }


    removeIngredientHandler = type => {

        const ingredientPrice = this.state.ingredientPrice[type]
        let totalPrice = this.state.totalPrice

        const ingredients = {
            ...this.state.ingredients
        }
        
        if (ingredients[type]) {
            // Имеет смысл сбрасывать, если есть с чего сбрасывать
            ingredients[type]--;
            totalPrice = (totalPrice * 10 - ingredientPrice * 10) / 10

        }
        this.setState({
            ingredients,
            totalPrice
        })
        this.updateOrder(ingredients)
    }


    purechasingHandler = () => {
        this.setState({
            purechasing: !this.state.purechasing
        })
    }


    continueOrderHandler = async () => {
        // this.setState({
        //     loading: true
        // })
        // const userOrder = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     date: new Date().toLocaleTimeString()
        // }
        // await axios.post('/orders.json', userOrder) ////
        //     .then(resp => {
        //         this.setState({
        //             loading: false,
        //             purechasing: false
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({
        //             loading: false,
        //             purechasing: false,
        //         })
        //     })
        const params = Object.entries(this.state.ingredients).map(item => {
            return (encodeURIComponent(item[0]) + '=' + encodeURIComponent(item[1]))
        })

        this.props.history.push({
            pathname: '/checkout-form',
            search: '?' + params.join('&')
        })
    }

    render() {
        console.log(this.state)
        let modal = (
            <Modal showModal={this.state.purechasing}
                   closeModal={this.purechasingHandler}
                >
                <OrderSummary
                    ingredients={this.state.ingredients}
                    closeModal={this.purechasingHandler}
                    continueOrder={this.continueOrderHandler}
                    totalPrice={this.state.totalPrice}
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
                <Burger  ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredFunc={this.newIngredientHandler}
                    deleteInredFunc={this.removeIngredientHandler}
                    totalPrice={this.state.totalPrice}
                    isOrdered={this.state.isOrdered && this.state.totalPrice > 0}
                    purchasingStart={this.purechasingHandler}
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


export default withError(BurgerBuilder, axios)