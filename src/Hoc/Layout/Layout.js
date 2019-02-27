import React from 'react'
import classes from './Layout.scss'

const Layout = (props) => {
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li><span>Toolbar</span></li>
                    <li><span>SideDrawer</span></li>
                    <li><span>Backdrop</span></li>
                </ul>
            </nav>
        </header>
        <main className={classes.PageMainContent}>
            { props.children }
        </main>
        </>
    )
}


export default Layout