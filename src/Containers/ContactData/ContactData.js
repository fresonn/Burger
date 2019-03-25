import React, { Component } from 'react'
import classes from './ContactData.scss'
import { withRouter } from 'react-router-dom'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '../../Components/UI/Button/Button'

const ContactData = class extends Component {
    state = {
        inputs: {
            name: {
                inputType: 'text',
                elementConfig: {
                    placeholder: 'Name'
                }
            },
            email: {
                inputType: 'email',
                elementConfig: {
                    placeholder: 'Email'
                }
            },
            phone: {
                inputType: 'tel',
                elementConfig: {
                    placeholder: 'Phone'
                }
            },
            address: {
                inputType: 'text',
                elementConfig: {
                    placeholder: 'Address: street, home, etc.'
                }
            }
        }
    }

    cancelOrderHAndler = event => {
        event.preventDefault()
        this.props.history.replace('/')
    }
    
    render() {
        const { touched, errors, isSubmitting } = this.props
        const formElementsArray = []

        for (const key in this.state.inputs) {
            formElementsArray.push({
                name: key,
                config: this.state.inputs[key]
            })
        }
        return (
            <div className={classes.MainOrderForm}>
                <h1 className={classes.Title}>Сonfirm your order</h1>
                <p className={classes.SubTitle}>Please, enter your data!</p>
                <Form>
                    <div className={classes.InputContainer}>
                        { formElementsArray.map((input, ind) => {
                            const name = input.name
                            return (
                                <div key={ind}>
                                <Field
                                    className={classes.FormInput}
                                    name={name} 
                                    placeholder={input.config.elementConfig.placeholder}
                                />
                                { touched[name] && errors[name] && <p className={classes.InputInfo}>{errors[name]}</p> }
                                </div>
                            )                                
                        }) }    
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button disabled={isSubmitting} type='submit' className={classes.CheckoutOrderOk}>order</button>
                        <Button clickFunc={this.cancelOrderHAndler}
                            classFor={'CheckoutOrderCancel'}
                        >cancel</Button>
                    </div>
                </Form>
            </div>
        )
    }
}


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1)
        .max(60)
        .required('this field cannot be empty'),
    email: Yup.string()
        .email('invalid email')
        .required('this field cannot be empty'),
    phone: Yup.string()
        .matches(phoneRegExp, 'phone number is not valid')
        .required('this field cannot be empty'),
    address: Yup.string()
        .min(5).max(60)
        .required('this field cannot be empty')
})

const FormikOrderForm = withFormik({
    mapPropsToValues(props) {
        const {sendFunc} = props
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
            onSend: sendFunc
        }
    },
    handleSubmit(values, {setSubmitting, props}) {
        props.sendFunc({...values})
        setSubmitting(false);

    },
    validationSchema: validationSchema
})(withRouter(ContactData))


export default FormikOrderForm