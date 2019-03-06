import React from 'react'
import classes from './NavigationItem.scss'


const NavigationItem = (props) => {
    const { linkText, linkHref } = props
    return (
        <li className={classes.NavigationItem}>
            <a className={classes.NavLink} href={linkHref}>{linkText}</a>
        </li>
    )
}

export default NavigationItem