import React, { Component } from 'react'


import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'

const BurgerBuilder = class extends Component {
    state = {
        isOrdered: false,
        ingredientPrice: {
            meat: 1.3,
            cheese: 0.8,
            salad: 0.5,
            bacon: 0.8
        },
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 0
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

    render() {
        console.log(this.state)
        return (
            <>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                addIngredFunc={this.newIngredientHandler}
                deleteInredFunc={this.removeIngredientHandler}
                totalPrice={this.state.totalPrice}
                isOrdered={this.state.isOrdered}
            />
            </>
        )
    }
}

export default BurgerBuilder