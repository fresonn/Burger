import React from 'react'
import classes from './Drawer.scss'

import Logo from '../../Logo/Logo'
import NavigationList from '../NavigationList/NavigationList'

const Drawer = (props) => {
    return (
        <div className={classes.Drawer}>
            <Logo />
            <NavigationList />
        </div>
    )
}

export default Drawer