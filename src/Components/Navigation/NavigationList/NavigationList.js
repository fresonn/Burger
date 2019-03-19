import React from 'react'
import classes from './NavigationList.scss'


import NavigationItem from './NavItem/NavigationItem'

const NavigationList = (props) => {

    const links = [
        { title: 'Burger Builder', address: '/', exact: true },
        { title: 'Orders', address: '/orders', exact: false},
    ]

    return (
        <ul className={classes.NavigationList}>
            { links.map((link) => {
                return (
                    <NavigationItem
                        key={link.title}
                        linkHref={link.address}
                        linkText={link.title}
                        exact={link.exact}
                        currentClass={'ActiveTwo'}
                    />
                )
            }) }
        </ul>
    )
}

export default NavigationList