import * as AT from '../actionType'


export const addIngredient = (type, price) => {
    return { 
        type: AT.NEW_BURGER_IGREDIENT,
        payload: {type, price}
    }
}

export const removeIngredient = (type, price) => {
    return { 
        type: AT.REMOVE_BURGER_INGREDIENT,
        payload: {type, price}
    }
}

export const clearBurger = () => {
    return { 
        type: AT.EMPTY_BURGER
    }
}