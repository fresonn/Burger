import * as AT from '../actionType'
const initialState = {
    isSignupMode: true
}


export default (state = initialState, action) => {
    switch (action.type) {
        case AT.AUTH_CHANGE_MODE:
            return {
                ...state,
                isSignupMode: !state.isSignupMode
            }
        default:
            return state
    }
}