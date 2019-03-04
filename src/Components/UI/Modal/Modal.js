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
        <Backdrop showModal={showModal} closeModal={closeModal} />
        <div className={cls.join(' ')}>
            { props.children }
        </div>
        </>
    )
}

export default Modal