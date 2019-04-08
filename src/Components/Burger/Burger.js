import React from 'react'
import classes from './Burger.scss'
import { withRouter } from 'react-router-dom'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {
    let ingredients = Object.entries(props.ingredients)
        .map((ingred) => {
            return [...Array(ingred[1])].map((_, i) => {
                return (
                    <BurgerIngredient
                        key={`${ingred[0]}_${i}`}
                        type={ingred[0]}
                    />
                )
            })
        })
        .reduce((arr, el) => {
            return [...arr, ...el]
        }, [])
    if (!ingredients.length) {
        ingredients = (
            <h1 className={classes.BurgerTitle}>Add something</h1>
        )
    }
    return (
        <section>
            <div className={classes.Burger}>
                <BurgerIngredient type={'bread-top'}/>
                { ingredients }
                <BurgerIngredient type={'bread-bottom'}/>
            </div>
        </section>
    )
}

export default withRouter(Burger) 