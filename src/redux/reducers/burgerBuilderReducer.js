import * as AT from '../actionType'

const initialState = {
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
    totalPrice: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AT.NEW_BURGER_IGREDIENT:
            let totalPrice = state.totalPrice
                totalPrice = (totalPrice * 10 + action.payload.price * 10) / 10
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.type]: state.ingredients[action.payload.type] + 1
                },
                totalPrice
            }
        case AT.REMOVE_BURGER_INGREDIENT:
            if (state.ingredients[action.payload.type]) {
                // Имеет смысл сбрасывать, если есть с чего сбрасывать
                let totalPrice = state.totalPrice
                    totalPrice = (totalPrice * 10 - action.payload.price * 10) / 10
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.payload.type]: state.ingredients[action.payload.type] - 1
                    },
                    totalPrice 
                }
            } else {
                return state
            }
        default:
            return state
    }
}