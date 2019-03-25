import React from 'react'
import classes from './FetchError.scss'

import WarningImage from '../../../assets/images/warning.svg'
import Button from '../Button/Button'

const FetchError = props => {
    const { showButton } = props
    return (
        <div className={classes.FetchErrorContainer}>
            <div className={classes.FetchError}>
                <img src={WarningImage} alt="Error download"/>
            </div>
            <h1 className={classes.Title}>Loading error</h1>
            { showButton ? <Button clickFunc={props.retryFunc} classFor={'ReconnectButton'}>
                <i className="fa fa-refresh" aria-hidden="true"></i>
            </Button> : null}
        </div>
    )
}

FetchError.defaultProps = {
    showButton: true
}

export default FetchError