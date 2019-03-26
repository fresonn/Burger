// import * as AT from '../actionType'
// import axios from '../../axios_config/axios_config'


// export const actionOfSend = (userOrder) => {
//     return async (dispatch) => {
//         await axios.post('/orders.json', userOrder)
//         .then(resp => {
//             changeLoading(false)
//             props.history.replace('/orders')
//         })
//         .catch(err => {
//             changeLoading(false)
//             changeError(err)
//         })
//     }
// }