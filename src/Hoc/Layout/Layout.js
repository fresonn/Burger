import React from 'react'
import {useState} from 'react'
import classes from './Layout.scss'


import ToolBar from '../../Components/Navigation/ToolBar/ToolBar'
import Drawer from '../../Components/Navigation/Drawer/Drawer'

const Layout = (props) => {
    const [ drawer, changeDrawer ] = useState(false)

    const drawerCloseHandler = () => {
        changeDrawer(!drawer)
    }   

    return (
        <>
        <ToolBar isOpen={drawer} closeFunc={drawerCloseHandler} />
        <Drawer isOpen={drawer} closeFunc={drawerCloseHandler} />        
        <main className={classes.PageMainContent}>
            { props.children }
        </main>
        {/* test */}
        <footer style={{backgroundColor: 'red',height: '600px'}}></footer>
        </>
    )
}


export default Layout