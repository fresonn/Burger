import React from 'react'
import { useEffect, useState } from 'react'

import Modal from '../../Components/UI/Modal/Modal'
import ErrorBox from '../../Components/UI/Modal/ErrorBox/ErrorBox'


import Wrapper from '../Wrapper/Wrapper'


const WithError = (WrappedComponent, axios) => {
    return (props) => {

        const [errorResp, errorHandler] = useState(null)

        useEffect(() => {
            axios.interceptors.request.use(req => {
                errorHandler(null)
                return req
            });
            axios.interceptors.response.use(res => res, err => {
                errorHandler(err)
            })
        }, []) 


        const errorConfirmedHandler = () => {
            errorHandler(null)
        }        

        return (
            <>
                <Modal
                    showModal={!!errorResp}
                    closeModal={errorConfirmedHandler}
                >
                    { errorResp ? <ErrorBox>{errorResp.message}</ErrorBox>: null }
                </Modal>
                <WrappedComponent {...props} />
            </>
        )   
    }
}

export default WithError