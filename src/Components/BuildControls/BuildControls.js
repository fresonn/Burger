import React from 'react'
import classes from './BuildControls.scss'
import { withRouter } from 'react-router-dom'

import Control from './Control/Control'
import Button from '../UI/Button/Button'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
]



const BuildControls = props => {
    const {isOrdered, purchasingStart, clearBurger, isAuthWithToken} = props
    // тект для кнопки
    const text = !isAuthWithToken ? 'sign in to continue' : 'order now'
    // со. функция 

    const whenIsntAuth = () => {
        props.history.push('/auth')
    }

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
                    clickFunc={isAuthWithToken ? purchasingStart: whenIsntAuth}
                    disabled={!isOrdered}
                >{text}</Button>
                <Button
                    clickFunc={clearBurger}
                    classFor={'ClearBurger'}
                    disabled={!isOrdered}
                >clear</Button>
                </div>
            </div>
        </section>
    )
}

export default withRouter(BuildControls)