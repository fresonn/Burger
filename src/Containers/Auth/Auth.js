import React from 'react'
import classes from './Auth.scss'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import Button from '../../Components/UI/Button/Button'

const Auth = (props) => {
    const { touched, errors } = props

    const inputItems = [
        {
            inputType: "tel",
            name: "login",
            placeholder: 'Your phone - is login'
        },
        {
            inputType: "password",
            name: "pass",
            placeholder: 'Your password'
        }
    ]

    return (
        <div className={classes.AuthFormWrapper}>
            <Form>
                <div className={classes.InputsContainer}>
                    { inputItems.map((input, ind) => {
                        const name = input.name
                        return (
                            <div key={ind}>
                                <Field
                                    className={classes.AuthInput} 
                                    name={name}
                                    type={input.inputType}
                                    placeholder={input.placeholder}
                                />
                                { touched[name] && errors[name] && <p className={classes.InputInfo}>{errors[name]}</p> }
                            </div>
                        )
                    }) }
                </div>
                <button type='submit'>confirm</button>
            </Form>
        </div>
    )
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const FormikAuth = withFormik({
mapPropsToStatus() {
    return {
        login: '',
        pass: ''
    };
},
handleSubmit(values) {
    console.log(values)
},
validationSchema: Yup.object().shape({
    login: Yup.string()
        .matches(phoneRegExp, 'phone number is not valid')
        .required('this field cannot be empty'),
    pass: Yup.string()
        .min(6)
        .max(40)
        .required('this field cannot be empty')
})
})(Auth);

export default FormikAuth;