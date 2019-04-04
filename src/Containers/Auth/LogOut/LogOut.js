import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../../../redux/actions/authAction'


const LogOut = (props) => {

    useEffect(() => {
        props.onLogOut()
    }, [])

    return <Redirect to='/' />
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut)