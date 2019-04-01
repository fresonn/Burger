import React from 'react'


import classes from './Drawer.scss'

import Logo from '../../Logo/Logo'
import NavigationList from '../NavigationList/NavigationList'
import Backdrop from '../../UI/Backdrop/Backdrop'

// UI
import Button from '../../UI/Button/Button'

const Drawer = (props) => {
    const {closeFunc, isOpen, links} = props

    const attachedClasses = [classes.Drawer]

    if (!isOpen) {
        attachedClasses.push(classes.Hide)
    } else {
        attachedClasses.push(classes.Open)
    }

    return (
        <>
        <Backdrop show={isOpen} close={closeFunc} classFor={'DrawerBackdrop'}/>
        <aside className={attachedClasses.join(' ')}>
            <div className={classes.DrawerWrapper}>
                <Button clickFunc={closeFunc} classFor={'DrawerCloseButton'}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <Logo />
                <nav>
                    <NavigationList links={links} closeFunc={closeFunc}/>
                </nav>
            </div>
        </aside>
        </>
    )
}

export default Drawer