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
        <div className={classes.PageWrapper}>
        <ToolBar isOpen={drawer} closeFunc={drawerCloseHandler} />
        <Drawer isOpen={drawer} closeFunc={drawerCloseHandler} />        
        <main>
            { props.children }
        </main>
        {/* test */}
        <footer style={{backgroundColor: '#fff',height: '600px'}}></footer>
        </div>
    )
}


export default Layout