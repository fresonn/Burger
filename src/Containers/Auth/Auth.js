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

    console.log(props)
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
                <div className={classes.AuthButtonContainer}>
                    <Button classFor='AuthFormButton'  type='submit'>
                        {props.isSignupMode ? 'sign up' : 'sign in' }
                    </Button>
                </div>
            </Form>
            <div className={classes.Switcher}>
                <label className={classes.Switch}>
                    <input type="checkbox" value={props.isSignupMode} checked={props.isSignupMode} onChange={props.onChangeMode} />
                    <div className={classes.Slider}></div>
                </label>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isSignupMode: state.auth.isSignupMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (dataObject, mode) => dispatch(_auth.authStart(dataObject, mode)),
        onChangeMode: () => dispatch(_auth.authChange())
    }
}

const formikAuth = withFormik({
    mapPropsToValues(props) {
        console.log(props, 'ppppppp')
        return {
            login: '',
            pass: ''
        };
    },
    handleSubmit(values, { props }) {
        console.log('iii', props)
        props.onAuth({...values}, props.isSignupMode)
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
})(Auth);


export default connect(mapStateToProps, mapDispatchToProps)(formikAuth);