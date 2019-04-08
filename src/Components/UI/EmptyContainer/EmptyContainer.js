import React from 'react'
import classes from './EmptyContainer.scss'

import Img from '../../../assets/images/empty-box.svg'

const EmptyContainer = props => {
    return (
        <div className={classes.EmptyContainer}>
            <div>
                <img src={Img} alt="There is no order"/>
                <p>Empty order list</p>
            </div>
        </div>
    )
}

export default EmptyContainer