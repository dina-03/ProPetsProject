import '../css/SignInForm.css';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {errorSelector, registrationAction} from "../store/auth";
import * as yup from 'yup';
import {set, useForm} from "react-cool-form";
import {useHistory} from "react-router-dom";
import ModalFooter from "./ModalFooter";
import Error from "./Error";
import Field from "./Field";

const SignUp=({currentForm})=>{
    const error = useSelector(errorSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const yupSchema = yup.object().shape({
        name: yup.string().min(2).required(),
        email: yup.string().email().required(),
        password: yup.string().min(3).required(),
        verify: yup.string().min(3).test("match", "password do not match", function () { return this.parent.password === this.parent.verify}).required()
    });
    const validateSignUpWithYup = schema => async values => {
        let errors = {}
        try {
            await schema.validate(values, {abortEarly: false})
        } catch (yupError) {
            yupError.inner.forEach(({path, message}) => set(errors, path, message))
        }
        return errors
    };
    const {form, use} = useForm({
        defaultValues: {name: '', email: '', password: '', verify: ''},
        validate: validateSignUpWithYup(yupSchema),
        onSubmit: (values, e, {submitter}) => {
            if(submitter.name === "reg") {
                dispatch(registrationAction(values))
                history.push('/posts')
            }
        }
    });
    const errors = use('errors', {errorWithTouched: true});

    return(
        <div className='singInForm'>
            {error && <Error text={error}/>}
            <form ref={form} className='signIn-form' noValidate>
                <div className='fieldSignInForm'>
                    <div className='labelField'>name:</div>
                    <div className='valueField'>
                        <Field name='name' type='text' error={errors.name} placeholder='enter your first name or nick'/>
                    </div>
                </div>
                <div className='fieldSignInForm'>
                    <div className='labelField'>email:</div>
                    <div className='valueField'>
                        <Field name='email' type='email' error={errors.email} placeholder='enter your email'/>
                    </div>
                </div>
                <div className='fieldSignInForm'>
                    <div className='labelField'>password:</div>
                    <div className='valueField'>
                        <Field name='password' type='password' error={errors.password} placeholder='enter your password'/>
                    </div>
                </div>
                <div className='fieldSignInForm'>
                    <div className='labelField'>password:</div>
                    <div className='valueField'>
                        <Field name='verify' type='password' error={errors.verify} placeholder='repeat your password'/>
                    </div>
                </div>

                <div className='line'></div>
                <div className='passwordRuleText'><p>Password must have at least 3 characters with at least one Capital letter, at least one lower case letter and at least one number or special character.</p>
                <ModalFooter currentForm={currentForm}/>
                </div>
            </form>
        </div>
    )
}

export default SignUp;