import React from 'react'
import classes from './Input.scss'

const Input = props => {
    const { label,
        inputType,
        placeholder, 
        classFor, 
        showLabel, 
        changeFunc,
    } = props
    
    const attachedClass = []

    if (showLabel) {
        attachedClass.push(classes.LabelShow)
    } else {
        attachedClass.push(classes.LabelHide)
    }

    return (
        <div>
            <label className={attachedClass.join(' ')} htmlFor="">{label}</label>
            <input
                onChange={changeFunc} 
                type={inputType} 
                className={classes[classFor]} 
                placeholder={placeholder}
            />
        </div>
    )
}

Input.defaultProps = {
    inputType: 'text', 
    classFor: 'FormInput',
    showLabel: false
}

export default Input