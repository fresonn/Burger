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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
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
                const expirationTime = new Date(new Date().getTime() + resp.data.expiresIn * 1000) // 3600
                localStorage.setItem('token', resp.data.idToken)
                localStorage.setItem('expirationTime', expirationTime)
                localStorage.setItem('userId', resp.data.localId)

                dispatch(authSuccess(resp.data))
                dispatch(checkAuthExpiresIn(resp.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message))
            })
    }
}

export const authCheckSession = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logOut())
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'))
            
            if (expirationTime > new Date()) {
                const _id = localStorage.getItem('userId')

                const authData = {
                    idToken: token,
                    localId: _id
                }
                dispatch(authSuccess(authData))
                dispatch(checkAuthExpiresIn( (expirationTime.getTime() - new Date().getTime()) / 1000 ))
            } else {
                dispatch(logOut())
            }
        }
    }
}


export const retryAuth = () => {
    return {
        type: AT.AUTH_RETRY_FOR_BACKDROP
    }
}