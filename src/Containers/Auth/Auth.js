import React, { useEffect } from 'react'
import classes from './Auth.scss'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '../../Components/UI/Button/Button'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as _auth from '../../redux/actions/authAction'
import LogoLoader from '../../Components/UI/Loaders/LogoLoader/LogoLoader'
import Backdrop from '../../Components/UI/Backdrop/Backdrop'
import ErrImg from '../../assets/images/error-image.svg'

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

    useEffect(() => {
        console.log(props.token)
        if (props.token) {
            props.history.replace('/')
        }
    }, [])

    const loadingUI = (
        <>
            <LogoLoader />
            <Backdrop show={props.loading} classFor={'OrderFormBackdrop'}/>
        </>
    )

    const errorUI = (
        <>
            <Backdrop show={props.error} classFor={'OrderFormBackdrop'}/>
            <div className={classes.ErrorUiBox}>
                <Button classFor={'authCloseModal'} clickFunc={props.onRetryShow}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
                <img className={classes.Image} src={ErrImg} alt="Error request/response"/>
                <p className={classes.SubTitle}>{props.error}</p>
            </div>
        </>
    )

    const FormElement =  (
        <section>
            <div className={classes.AuthFormWrapper}>
            { props.loading ? loadingUI : props.error ? errorUI : null}
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
            <div className={classes.FeedbackContainer} />
        </section>
    )

    return props.token ? <Redirect to='/' /> : FormElement
}

const mapStateToProps = (state) => {
    return {
        isSignupMode: state.auth.isSignupMode,
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (dataObject, mode) => dispatch(_auth.auth(dataObject, mode)),
        onChangeMode: () => dispatch(_auth.authChange()),
        onRetryShow: () => dispatch(_auth.retryAuth())
    }
}

const formikAuth = withFormik({
    mapPropsToValues(props) {
        return {
            login: '',
            pass: ''
        };
    },
    handleSubmit(values, { props }) {
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