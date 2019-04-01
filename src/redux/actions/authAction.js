import * as AT from '../actionType'
import axios from 'axios'


export const authChange = () => {
    return {
        type: AT.AUTH_CHANGE_MODE
    }
}


export const authStart = () => {
    return {
        type: AT.AUTH_START
    }
}


export const authSuccess = (userData) => {
    return {
        type: AT.AUTH_SUCCESS,
        payload: {
            token: userData.idToken,
            userId: userData.localId
        }
    }
}

export const authFail = (err) => {
    return {
        type: AT.AUTH_FAIL,
        payload: {
            err: err
        }
    }
}


export const logOut = () => {
    return {
        type: AT.AUTH_LOGOUT
    }
}


export const checkAuthExpiresIn = (time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut())
        }, time * 1000) // т.к в ms
    }
}


export const auth = (dataObject, isSignup) => {
    return (dispatch) => {
        dispatch(authStart())
        const apiKey = 'AIzaSyBBqOCHjapwcgk8K16cE05rQnN0zs_MOMg'
        let _url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        if (!isSignup) {
            _url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`
        }
        const authData = {
            email: dataObject.login,
            password: dataObject.pass,
            returnSecureToken: true
        }
        axios.post(_url, authData)
            .then(resp => {
                dispatch(authSuccess(resp.data))
                dispatch(checkAuthExpiresIn(resp.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message))
            })
    }
}


export const retryAuth = () => {
    return {
        type: AT.AUTH_RETRY_FOR_BACKDROP
    }
}