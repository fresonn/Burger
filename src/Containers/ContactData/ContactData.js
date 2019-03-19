import React, { Component } from 'react'
import classes from './ContactData.scss'
import { withRouter } from 'react-router-dom'


import Button from '../../Components/UI/Button/Button'

const ContactData = class extends Component {
    state = {
        name: '',
        email: '',
        address: {
            city: '',
            street: ''
        }
    }


    cancelOrderHAndler = event => {
        event.preventDefault()
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className={classes.MainOrderForm}>
                <h1 className={classes.Title}>Сonfirm your order</h1>
                <p className={classes.SubTitle}>Please, enter your data!</p>
                <form>
                    <div className={classes.InputContainer}>
                        <input type="text" name={''} placeholder={'Name'}/>
                        <input type="email" name={''} placeholder={'Email'}/>
                        <input type="text" name={''} placeholder={'Address'}/>
                        <input type="tel" name={''} placeholder={'Phone'}/>
                    </div>
                    <div className={classes.ButtonContainer}>
                        <Button clickFunc={this.props.sendFunc}
                            classFor={'CheckoutOrderOk'}
                        >order</Button>
                        <Button clickFunc={this.cancelOrderHAndler}
                            classFor={'CheckoutOrderCancel'}
                        >cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(ContactData)