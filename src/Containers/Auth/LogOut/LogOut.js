import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as AT from '../../../redux/actionType'


const LogOut = (props) => {

    useEffect(() => {
        props.onLogOut()
    }, [])

    return <Redirect to='/' />
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch({type: AT.AUTH_LOGOUT})
    }
}

export default connect(null, mapDispatchToProps)(LogOut)