import React, { Component } from 'react'
import './index.scss'

// HOC
import Layout from './Hoc/Layout/Layout'


// Components
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'


const App = class extends Component {

    // state = {
    //     show: true
    // }

    // componentDidMount = () => {
    //     setTimeout(() => {
    //         this.setState({
    //             show: false
    //         })
    //     }, 5000)
    // }
    

    render() {
        return (
            <Layout>
                <BurgerBuilder />
                {/* { this.state.show ? <BurgerBuilder /> : null} */}
            </Layout>
        )
    }
}



export default App