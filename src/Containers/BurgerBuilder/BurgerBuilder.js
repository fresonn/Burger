import React, { Component } from 'react'
import classes from './BurgerBuilder.scss'

import axios from '../../axios_config/axios_config'

import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import OrderLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'

import Modal from '../../Components/UI/Modal/Modal'
import Wrapper from '../../Hoc/Wrapper/Wrapper'
import withError from '../../Hoc/withError/withError'


const BurgerBuilder = class extends Component {
    state = {
        ingredientPrice: {
            cheese: 1.2,
            meat: 1.7,
            salad: 0.5,
            bacon: 1.4
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
        isError: false
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
        this.setState({
            loading: true
        })
        const userOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        await axios.post('/orders', userOrder) ////
            .then(resp => {
                this.setState({
                    loading: false,
                    purechasing: false
                })
            })
            .catch(err => {
                console.log('EEEERRRROORRR')
                this.setState({
                    loading: false,
                    purechasing: false,
                    isError: true
                })
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
        
        return (
            <>
            <Wrapper>
                { this.state.purechasing ? modal : null  }
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredFunc={this.newIngredientHandler}
                    deleteInredFunc={this.removeIngredientHandler}
                    totalPrice={this.state.totalPrice}
                    isOrdered={this.state.isOrdered}
                    purchasingStart={this.purechasingHandler}
                />
            </Wrapper>
            <footer className={classes.Test}></footer>
            </>
        )
    }
}

// export default BurgerBuilder
export default withError(BurgerBuilder, axios)