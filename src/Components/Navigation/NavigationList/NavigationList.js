import React from 'react'
import classes from './NavigationList.scss'


import NavigationItem from './NavItem/NavigationItem'

const NavigationList = (props) => {

    const links = [
        { title: 'Burger Builder', address: '/' },
        { title: 'Checkout', address: '/' },
    ]

    return (
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
    )
}

export default NavigationList