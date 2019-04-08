import React from 'react'
import classes from './NavigationList.scss'
import NavigationItem from './NavItem/NavigationItem'

const NavigationList = (props) => {

    const { links } = props

    return (
        <ul className={classes.NavigationList}>
            { links.map((link) => {
                return (
                    <NavigationItem
                        key={link.title}
                        closeFunc={props.closeFunc}
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