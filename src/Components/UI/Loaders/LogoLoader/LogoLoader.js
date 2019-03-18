import React from 'react'
import classes from './LogoLoader.scss'

import Logo from '../../../../assets/images/burger-logo.svg'

const LogoLoader = props => {
    return (
        <div className={classes.LogoLoader}>
            <img src={Logo} alt="Burger"/>
        </div>
    )
}

export default LogoLoader