import React from 'react'
import classes from './Layout.scss'


import ToolBar from '../../Components/Navigation/ToolBar/ToolBar'
import Drawer from '../../Components/Navigation/Drawer/Drawer'

const Layout = (props) => {
    return (
        <>
        <ToolBar />
        <Drawer />        
        <main className={classes.PageMainContent}>
            { props.children }
        </main>
        </>
    )
}


export default Layout