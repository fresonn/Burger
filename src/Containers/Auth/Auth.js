import React from 'react'
import classes from './Auth.scss'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '../../Components/UI/Button/Button'
import { connect } from 'react-redux'
import * as _auth from '../../redux/actions/authAction'

const Auth = (props) => {
    const { touched, errors } = props

    const inputItems = [
        {
            inputType: "email",
            name: "login",
            placeholder: 'Your e-mail'
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
                <Button classFor='AuthFormButton'  type='submit'>confirm</Button>
            </Form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (dataObject) => dispatch(_auth.authStart(dataObject))
    }
}

const formikAuth = withFormik({
    mapPropsToValues() {
        return {
            login: '',
            pass: ''
        };
    },
    handleSubmit(values, { props }) {
        props.onAuth({...values})
    },
    validationSchema: Yup.object().shape({
        login: Yup.string()
            .email('invalid email')
            .required('this field cannot be empty'),
        pass: Yup.string()
            .min(6)
            .max(40)
            .required('this field cannot be empty')
    })
})(connect(null, mapDispatchToProps)(Auth));


export default connect(null, mapDispatchToProps)(formikAuth);