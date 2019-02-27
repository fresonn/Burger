import React, { Component } from 'react'
import './index.scss'

// HOC
import Layout from './Hoc/Layout/Layout'


// Components
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'


const App = class extends Component {
    render() {
        return (
            <Layout>
                <BurgerBuilder />
            </Layout>
        )
    }
}



export default App