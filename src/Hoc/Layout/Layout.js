import React from 'react'
import { useState } from 'react'
import classes from './Layout.scss'
import { connect } from 'react-redux'

import ToolBar from '../../Components/Navigation/ToolBar/ToolBar'
import Drawer from '../../Components/Navigation/Drawer/Drawer'
import Footer from '../../Components/Footer/Footer'

const Layout = (props) => {
    const [ drawer, changeDrawer ] = useState(false)

    let links = [
        { title: 'Burger', address: '/', exact: true },
        { title: 'Log in', address: '/auth', exact: false }
    ]
    

    if (props.isAuthenticated !== null) {
        links = [
            { title: 'Burger', address: '/', exact: true },
            { title: 'Orders', address: '/orders', exact: false },
            { title: 'Log out', address: '/logout', exact: false }
        ]
    }

    const drawerCloseHandler = () => {
        changeDrawer(!drawer)
    }  

    return (
        <div className={classes.PageWrapper}>
            <ToolBar 
                links={links} 
                closeFunc={changeDrawer}
            />
            <Drawer 
                links={links} 
                isOpen={drawer} 
                closeFunc={drawerCloseHandler}
            />        
            <main>
                { props.children }
            </main>
            <Footer links={links}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)