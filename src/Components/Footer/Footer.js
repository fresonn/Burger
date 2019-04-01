import React from 'react';
import classes from './Footer.scss'
import { withRouter, Link } from 'react-router-dom'

const Footer = (props) => {
    const { links } = props
    return (
        <footer className={classes.MainFooter}>
            <div className={classes.FooterContainer}>
                <div className={classes.FooterNavigation}>
                    <h4 className={classes.FooterNavigation_Title}>Navigation:</h4>
                    <ul className={classes.NavFooterList}>
                        { links.map((link, ind) => {
                            return (
                                <li key={ind}>
                                    <p className={classes.PageItem}>
                                        <Link to={link.address}>{link.title}</Link>
                                    </p>
                                </li>
                            )
                        }) }
                    </ul>
                </div>
                <div className={classes.NetworkContainer}>
                <ul className={classes.socialNetworksList}>
                    <li className={classes.Network_Instagram}>
                        <a href="https://www.instagram.com/">
                            <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                    </li>
                    <li className={classes.Network_Facebook}>
                        <a href="https://www.facebook.com/">
                            <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                    </li>
                    <li className={classes.Network_Twitter}>
                        <a href="https://twitter.com/">
                            <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                    </li>
                </ul>
                </div>
                <div className={classes.ContactsContainer}>
                    <h4 className={classes.FooterNavigation_Title}>Contacts:</h4>
                    <p className={classes.ContactItem}>Tel: +380 96-222-3939</p>
                    <p className={classes.ContactItem}>burge@gmail.com</p>
                    <p className={classes.ContactItem}>Maidan Constitution 11</p>
                </div>
            </div>
            <h4 className={classes.CopyrightText}>
            <i className="fa fa-copyright" aria-hidden="true"></i>
            {new Date().getFullYear()}
            {' Burger ltd.'}
            </h4>
        </footer>
    )
}

export default withRouter(Footer)