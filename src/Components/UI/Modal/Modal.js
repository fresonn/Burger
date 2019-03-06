import React from 'react'
import classes from './Modal.scss'


import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {
    const {showModal, closeModal} = props
    const cls = [
        classes.Modal
    ]

    if (showModal) {
        cls.push(classes.ModalAnimation)
    }

    return (
        <>
        <Backdrop classFor={'ModalBackdrop'} show={showModal} close={closeModal} />
        <div className={cls.join(' ')}>
            { props.children }
        </div>
        </>
    )
}

export default Modal