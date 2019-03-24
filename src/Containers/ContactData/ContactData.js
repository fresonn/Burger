import React, { Component } from 'react'
import classes from './ContactData.scss'
import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { validate } from './validation/validation'

import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Inputs/Input'

const ContactData = class extends Component {
    state = {
        orderForm: {
            name: '',
            email: '',
            phone: '',
            address: ''
        },
        inputs: {
            name: {
                inputType: 'text',
                elementConfig: {
                    label: 'Enter your name',
                    placeholder: 'Name'
                },
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                inputType: 'email',
                elementConfig: {
                    label: 'Enter your email',
                    placeholder: 'Email'
                },
                validation: {
                    required: true
                },
                valid: false
            },
            phone: {
                inputType: 'tel',
                elementConfig: {
                    label: 'Enter your phone',
                    placeholder: 'Phone'
                },
                validation: {
                    required: true
                },
                valid: false
            },
            address: {
                inputType: 'text',
                elementConfig: {
                    label: 'Enter your address',
                    placeholder: 'Address: street, home, etc.'
                },
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    cancelOrderHAndler = event => {
        event.preventDefault()
        this.props.history.replace('/')
    }

    sendOrderHandler = event => {
        event.preventDefault()
        this.props.sendFunc({...this.state.orderForm})
    }
    

    inputChangeHandler = (event, inputIdent) => {
        console.log(inputIdent)
        const orderForm = Object.assign({}, this.state.orderForm)
        orderForm[inputIdent.id] = event.target.value
        this.setState({
            orderForm
        })

    }

    render() {

        const formElementsArray = []

        for (const key in this.state.inputs) {
            formElementsArray.push({
                id: key,
                config: this.state.inputs[key]
            })
        }

        console.log(this.state.orderForm)
        return (
            <div className={classes.MainOrderForm}>
                <h1 className={classes.Title}>Сonfirm your order</h1>
                <p className={classes.SubTitle}>Please, enter your data!</p>
                <form>
                    <div className={classes.InputContainer}>
                        { formElementsArray.map((input, ind) => {
                            // console.log(input)
                            return (
                                <Field
                                    key={ind}
                                    component={(props) => (
                                        <Input
                                            {...props} 
                                            inputType={input.config.inputType}
                                            label={input.config.label}
                                            placeholder={input.config.elementConfig.placeholder}
                                            changeFunc={event => this.inputChangeHandler(event, input)}
                                        />
                                    )}
                                    name={input.id}
                                />
                                
                            )
                        }) }    
                    </div>
                    <div className={classes.ButtonContainer}>
                        <Button type='submit' clickFunc={this.sendOrderHandler}
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

const orderForm = reduxForm({
    form: 'orderForm',
    validate
})(withRouter(ContactData))

export default orderForm