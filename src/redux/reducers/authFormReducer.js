import * as AT from '../actionType'

const initialState = {
    loading: false,
    isSignupMode: false,
    error: null,
    token: null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AT.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case AT.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case AT.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                token: null,
                userId: null,
                error: action.payload.err
            }
        case AT.AUTH_CHANGE_MODE:
            return {
                ...state,
                isSignupMode: !state.isSignupMode
            }
        case AT.AUTH_RETRY_FOR_BACKDROP:
            return {
                ...state,
                error: null
            }
        case AT.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null

            }
        default:
            return state
    }
}