import React from 'react'
import classes from './Burger.scss'

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
    // const ingredients = Object.keys(props.ingredients)
    //     .map(ingred => {
    //         return [...Array(props.ingredients[ingred])]
    //             .map((_, i) => {
    //                 return (
    //                     <BurgerIngredient type={ingred}/>
    //                 )
    //             })
    //     })
    if (!ingredients.length) {
        ingredients = (
            <h1>Add some...</h1>
        )
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            { ingredients }
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    )
}


export default Burger