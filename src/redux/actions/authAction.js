import * as AT from '../actionType'
import axios from 'axios'


export const authSuccess = (userData) => {
    return {
        type: AT.AUTH_SUCCESS,
        payload: userData
    }
}


export const authFail = (err) => {
    return {
        type: AT.AUTH_FAIL,
        err: err
    }
}


export const authStart = (dataObject) => {
    return (dispatch) => {
        const apiKey = 'AIzaSyBBqOCHjapwcgk8K16cE05rQnN0zs_MOMg'
        const _url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        const authData = {
            email: dataObject.login,
            password: dataObject.pass,
            returnSecureToken: true
        }
        console.log(authData)
        axios.post(_url, authData)
            .then(resp => {
                console.log(resp)
                dispatch(authSuccess(resp.data))
            })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}