import React from 'react'
import classes from './OrderSummary.scss'


import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const {ingredients, closeModal, continueOrder, totalPrice} = props
    const ingredientsSummary = Object.keys(ingredients)
        .map((ingredName, ind) => {
            const [first, ...other] = ingredName
            const name = first.toUpperCase() + other.join('')
            return (
                <li key={ingredName + ind}>
                    <span>{name}: </span>{ingredients[ingredName]}
                </li>
            )
        })
    return (
        <div className={classes.OrderSummary}>
            <h2 className={classes.OrderTitle}>Your Order</h2>
            <p className={classes.firstPar}>Ingredients of your burger:</p>
            <ul className={classes.ListOrder}>
                { ingredientsSummary }
            </ul>
            <p className={classes.OrderText}><strong>The amount of your order: </strong>{totalPrice}$</p>
            <Button classFor={'CloseButton'} clickFunc={closeModal}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </Button>
            <Button classFor={'ContinueButton'} clickFunc={continueOrder}>continue</Button>
        </div>
    )
}

export default OrderSummary