import React from 'react'
import { useEffect, useState } from 'react'

import Modal from '../../Components/UI/Modal/Modal'
import OrderResultBox from '../../Components/UI/Modal/ErrorBox/OrderResultBox'


import Wrapper from '../Wrapper/Wrapper'
import Loader from '../../Components/UI/Loaders/OrderLoader/OrderLoader'


const WithError = (WrappedComponent, axios) => {
    return (props) => {

        const [errorResp, errorHandler] = useState(null)

        useEffect(() => {
            const reqInterceptor = axios.interceptors.request.use(req => {
                errorHandler(null)
                return req
            });
            const resInterceptor = axios.interceptors.response.use(res => res, err => {
                errorHandler(err)
            })
            return () => {
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
                console.log(reqInterceptor, resInterceptor)
                // После очистки оба должны получить значение 0
            }
        }, []) 


        const errorConfirmedHandler = () => {
            errorHandler(null)
        }        

        return (
            <>
            <Wrapper>
                <Modal
                    showModal={!!errorResp}
                    closeModal={errorConfirmedHandler}
                >
                    { errorResp ? <OrderResultBox>{errorResp.message}</OrderResultBox>: <Loader /> }
                </Modal>
                <WrappedComponent {...props} />
            </Wrapper>
            </>
        )   
    }
}

export default WithError