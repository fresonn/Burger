import axios from 'axios'

const inst = axios.create({
    baseURL: 'https://burger-app-js.firebaseio.com/'
})

export default inst;