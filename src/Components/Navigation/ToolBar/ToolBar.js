import React from 'react'
import classes from './ToolBar.scss'


import BurgerLogo from '../../Logo/Logo'
import NavigationItem from '../NavigationList/NavItem/NavigationItem'

const ToolBar = (props) => {

    const {closeFunc} = props
    // const {isOpen, closeFunc} = props

    // const attachedClasses = [
    //     classes.BurgerMenuButton
    // ]

    // if (isOpen) {
    //     attachedClasses.push(classes.Close)
    // }

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
                <div onClick={closeFunc} className={classes.BurgerMenuButton}>
                    <div className={classes._item} />
                    <div className={classes._item} />
                    <div className={classes._item} />
                </div>
                <nav className={classes.MainToolNavigation}>
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