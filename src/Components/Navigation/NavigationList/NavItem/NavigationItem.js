import React from 'react'
import classes from './NavigationItem.scss'
import { NavLink } from 'react-router-dom'

const NavigationItem = (props) => {
    const { linkText, linkHref, exact, currentClass, closeFunc } = props
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                onClick={closeFunc} 
                className={classes.NavLink} 
                to={linkHref}
                exact={exact}
                activeClassName={classes[currentClass]}
            >{linkText}</NavLink>
        </li>
    )
}

export default NavigationItem