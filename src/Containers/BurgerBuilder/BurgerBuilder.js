import React, { Component } from 'react'


import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/BuildControls/BuildControls'

const BurgerBuilder = class extends Component {

    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        }
    }

    render() {
        return (
            <>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls />
            </>
        )
    }
}

export default BurgerBuilder