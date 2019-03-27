import * as AT from '../actionType'

const initialState = {
    ingredientPrice: null,
    ingredients: {
        cheese: 0,
        meat: 0,
        salad: 0,
        bacon: 0
    },
    totalPrice: 0,
    loading: false,
    prefetchDataError: false,
    purechasing: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AT.SET_INGREDIENTS:
            return {
                ...state,
                ingredientPrice: action.payload,
                prefetchDataError: false
            }
        case AT.STOP_PURECHASING:
            return {
                ...state,
                purechasing: !state.purechasing
            }
        case AT.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                prefetchDataError: true
            }
        case AT.NEW_BURGER_IGREDIENT:
            let totalPrice = state.totalPrice
                totalPrice = (totalPrice * 10 + state.ingredientPrice[action.payload] * 10) / 10
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice
            }
        case AT.REMOVE_BURGER_INGREDIENT:
            if (state.ingredients[action.payload]) {
                // Имеет смысл сбрасывать, если есть с чего сбрасывать
                let totalPrice = state.totalPrice
                    totalPrice = (totalPrice * 10 - state.ingredientPrice[action.payload] * 10) / 10
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.payload]: state.ingredients[action.payload] - 1
                    },
                    totalPrice 
                }
            } else {
                return state
            }
        case AT.EMPTY_BURGER:
            return {
                ...state,
                ingredients: {
                    cheese: 0,
                    meat: 0,
                    salad: 0,
                    bacon: 0
                },
                totalPrice: 0
            }
        case AT.DEFAULT_PURCHASING_BEFORE_UNMOUNT:
            return {
                ...state,
                purechasing: false
            }
        default:
            return state
    }
}