import React from 'react'
import {useState} from 'react'
import classes from './Layout.scss'


import ToolBar from '../../Components/Navigation/ToolBar/ToolBar'
import Drawer from '../../Components/Navigation/Drawer/Drawer'
import Footer from '../../Components/Footer/Footer'

const Layout = (props) => {
    const [ drawer, changeDrawer ] = useState(false)

    const drawerCloseHandler = () => {
        changeDrawer(!drawer)
    }   

    return (
        <div className={classes.PageWrapper}>
        <ToolBar isOpen={drawer} closeFunc={drawerCloseHandler} />
        <Drawer isOpen={drawer} closeFunc={drawerCloseHandler} />        
        <main>
            { props.children }
        </main>
        <Footer />
        </div>
    )
}


export default Layout