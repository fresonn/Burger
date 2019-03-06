import React from 'react'
import classes from './ToolBar.scss'


import BurgerLogo from '../../Logo/Logo'
import NavigationItem from '../NavigationList/NavItem/NavigationItem'

const ToolBar = (props) => {

    const links = [
        { title: 'Burger Builder', address: '/' },
        { title: 'Checkout', address: '/' },
        { title: 'Menu', address: '/' },
    ]

    return (
        <header className={classes.ToolBar}>
            <div className={classes.ToolWrapper}>
                <div className={classes.ToolImgContainer}>
                    <BurgerLogo />       
                </div>
                <nav>
                    <ul className={classes.NavigationList}>
                        { links.map((link) => {
                            return (
                                <NavigationItem
                                    key={link.title}
                                    linkHref={link.address}
                                    linkText={link.title}
                                />
                            )
                        }) }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default ToolBar