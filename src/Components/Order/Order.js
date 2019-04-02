import React from 'react'
import classes from './Order.scss'
import dateFns from 'date-fns'

const Order = props => {
    const ingredients = []

    for (const ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientsOutput = ingredients.map(ingred => {
        if (ingred.amount > 0) {
            return <span key={ingred.name} className={classes.IngredientItem}>{ingred.name}: {ingred.amount}</span>
        } else {
            return null
        }
    })

    const whenOrdered = dateFns.distanceInWords(
        new Date(`${props.date} ${props.time}`),
        new Date(),
        {addSuffix: true}
    )

    return (
        <article className={classes.Order}>
            <span className={classes.WhenInfo}>{whenOrdered}</span>
            <h4 className={classes.IngredName}>Ingredients:</h4>
            <ul className={classes.IgredItemOrderList}>
                {ingredientsOutput}
            </ul>
            <p>Price: <strong>{props.price}$</strong></p>
            <p>Date: <strong>{props.date}</strong></p>
        </article>
    )
}

export default Order