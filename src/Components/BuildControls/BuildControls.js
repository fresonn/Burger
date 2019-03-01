import React from 'react'
import classes from './BuildControls.scss'

import Control from './Control/Control'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
]

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            { controls.map((control) => {
                return (
                    <Control
                        key={control.label}
                        label={control.label}
                    />
                )
            }) }
        </div>
    )
}


export default BuildControls