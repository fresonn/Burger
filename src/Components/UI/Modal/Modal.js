import React from 'react'
import classes from './Modal.scss'


import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {
    const {showModal, closeModal, hideForLoader} = props
    
    const cls = [ classes.Modal ]

    if (showModal) {
        cls.push(classes.ModalAnimation)
    } else {
        cls.push(classes.Hide)
    }

    if (hideForLoader) {
        cls.push(classes.HideModalForLoader)
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

export default React.memo(Modal)