import React from 'react'
import classes from './ErrorBox.scss'

import ErrorImage from '../../../../assets/images/error-image.svg'


const ErrorBox = props => {
    return (
        <div className={classes.ErrorBox}>
            <img src={ErrorImage} alt="Error icon"/>
            <h4 className={classes.ErrorTitle}>{props.children}</h4>
            <p className={classes.ErrorDescription}>Please try again!</p>
        </div>
    )
}


export default ErrorBox