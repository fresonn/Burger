import React from 'react'
import classes from './ToolBar.scss'
import { withRouter } from 'react-router-dom'

import BurgerLogo from '../../Logo/Logo'
import NavigationItem from '../NavigationList/NavItem/NavigationItem'
import Button from '../../UI/Button/Button'

const ToolBar = (props) => {
    const {closeFunc} = props
    
    const links = [
        { title: 'Burger Builder', address: '/', exact: true },
        { title: 'Orders', address: '/orders', exact: false }
    ]

    const onRootPage = () => {
        props.history.replace('/')
    }

    return (
        <header className={classes.ToolBar}>
            <div className={classes.ToolWrapper}>
                <div onClick={onRootPage} className={classes.ToolImgContainer}>
                    <BurgerLogo />       
                </div>
                <h2 onClick={onRootPage} className={classes.ToolBarTitle}>Burger</h2>
                <Button clickFunc={closeFunc} classFor={'BurgerMenuButton'}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </Button>
                <nav className={classes.MainToolNavigation}>
                    <ul className={classes.NavigationList}>
                        { links.map((link) => {
                            return (
                                <NavigationItem
                                    key={link.title}
                                    linkHref={link.address}
                                    linkText={link.title}
                                    exact={link.exact}
                                    currentClass={'Active'}
                                />
                            )
                        }) }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default withRouter(ToolBar)