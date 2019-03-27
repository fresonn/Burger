import * as AT from '../actionType'
import axios from '../../axios_config/axios_config'

export const addIngredient = (type) => {
    return { 
        type: AT.NEW_BURGER_IGREDIENT,
        payload: type
    }
}

export const removeIngredient = (type) => {
    console.log(type)
    return { 
        type: AT.REMOVE_BURGER_INGREDIENT,
        payload: type
    }
}

export const clearBurger = () => {
    return { 
        type: AT.EMPTY_BURGER
    }
}

export const stopPurechasing = () => {
    return {
        type: AT.STOP_PURECHASING
    }
}

// Fetching data

export const setIngredientsPrice = (priceObjec) => {
    return {
        type: AT.SET_INGREDIENTS,
        payload: priceObjec
    }
}


export const fetchFaild = () => {
    return {
        type: AT.FETCH_INGREDIENTS_FAILED
    }
}


export const fetchAfterMounting = () => {
    return (dispatch) => {
        axios.get('https://burger-app-js.firebaseio.com/ingredientsPrice.json')
        .then(resp => {
            dispatch(setIngredientsPrice(resp.data))
        })
        .catch(err => {
            dispatch(fetchFaild())
        })
    }
}

// Retry fetching data


export const retryFetchData = () => {
    return (dispatch) => {
        axios.get('https://burger-app-js.firebaseio.com/ingredientsPrice.json')
        .then(resp => {
            dispatch(setIngredientsPrice(resp.data))
        })
        .catch(err => {
            dispatch(fetchFaild())
        })
    }
}


export const defaultPurechasing = () => {
    return {
        type: AT.DEFAULT_PURCHASING_BEFORE_UNMOUNT
    }
}