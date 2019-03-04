import React from 'react'
import classes from './BuildControls.scss'

import Control from './Control/Control'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = props => {
    const {isOrdered, purchasingStart} = props

    return (
        <section>
            <div className={classes.BuildControls}>
                <p>Total price: <strong>{props.totalPrice}$</strong></p>
                { controls.map((control) => {
                    return (
                        <Control
                            key={control.label}
                            label={control.label}
                            addIngredFunc={() =>props.addIngredFunc(control.type)}
                            deleteInredFunc={() => props.deleteInredFunc(control.type)}
                        />
                    )
                }) }
                <button
                    onClick={purchasingStart}
                    className={classes.orderButton}
                    disabled={!isOrdered}
                >order now</button>
            </div>
        </section>
    )
}


export default BuildControls