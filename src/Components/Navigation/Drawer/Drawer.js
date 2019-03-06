import React from 'react'


import classes from './Drawer.scss'

import Logo from '../../Logo/Logo'
import NavigationList from '../NavigationList/NavigationList'
import Backdrop from '../../UI/Backdrop/Backdrop'

// UI
import Button from '../../UI/Button/Button'

const Drawer = (props) => {
    const {closeFunc, isOpen} = props

    const attachedClasses = [classes.Drawer]

    if (!isOpen) {
        attachedClasses.push(classes.Close)
    }

    return (
        <>
        <Backdrop show={isOpen} close={closeFunc} classFor={'DrawerBackdrop'}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.DrawerWrapper}>
                <Button clickFunc={closeFunc} classFor={'DrawerCloseButton'}>✖</Button>
                <Logo />
                <nav>
                    <NavigationList />
                </nav>
            </div>
        </div>
        </>
    )
}

export default Drawer