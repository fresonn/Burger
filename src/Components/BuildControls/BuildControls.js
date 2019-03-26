import React from 'react'
import classes from './BuildControls.scss'


import Control from './Control/Control'
import Button from '../UI/Button/Button'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
]



const BuildControls = props => {
    const {isOrdered, purchasingStart, clearBurger} = props

    return (
        <section>
            <div className={classes.BuildControls}>
                <p>Total price: <strong>{props.totalPrice}$</strong></p>
                { controls.map((control) => {
                    return (
                        <Control
                            key={control.label}
                            label={control.label}
                            addIngredFunc={() => props.addIngredFunc(control.type)}
                            deleteInredFunc={() => props.deleteInredFunc(control.type)}
                        />
                    )
                }) }
                <div  className={classes.ButtonContainer}>
                <Button
                    classFor={'orderButton'}
                    clickFunc={purchasingStart}
                    disabled={!isOrdered}
                >order now</Button>
                <Button
                    clickFunc={clearBurger}
                    classFor={'ClearBurger'}
                >clear</Button>
                </div>
            </div>
        </section>
    )
}

export default BuildControls