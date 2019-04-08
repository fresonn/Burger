import React from 'react'
import classes from './Logo.scss'
import LogoBurger from '../../assets/images/burger-logo.svg'

const Logo = (props) => {
    return (
        <div className={classes.LogoContainer}>
            <img src={LogoBurger} alt="burger logo"/>
        </div>
    )
}

export default Logo