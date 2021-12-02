import './../css/SignInForm.css';
import './../css/Buttons.css'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {errorSelector, loginAction} from "../store/auth";
import * as yup from 'yup';
import {set, useForm} from "react-cool-form";
import {Link, useHistory} from "react-router-dom";
import ModalFooter from "./ModalFooter";
import Error from "./Error";
import Field from "./Field";

const SignIn = ({currentForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const error = useSelector(errorSelector);
    const yupSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(3).required()
    });

    const validateWithYup = (schema) => async (values) => {
        let errors = {};
        try {
            await schema.validate(values, {abortEarly: false});
        } catch (yupError) {
            yupError.inner.forEach(({path, message}) =>
                set(errors, path, message));
        }
        return errors;
    }
    const {form, use} = useForm({
        defaultValues: {email: '', password: ''},
        validate: validateWithYup(yupSchema),
        onSubmit: (values, e, {submitter}) => {
            if (submitter.name === 'submit') {
                dispatch(loginAction(values));
                history.push('/posts');
            }
        }
    });
    const errors = use('errors', {errorWithTouched: true});

    return (
        <div className='singInForm'>
            {error && <Error text={error}/>}
            <form ref={form} className='signIn-form' noValidate>
                <div className='fieldSignInForm'>
                    <div className='labelField'>Email:</div>
                    <div className='valueField'>
                        <Field
                            name='email'
                            type='email'
                            error={errors.email}
                            placeholder='enter your email'
                        />
                    </div>
                </div>
                <div className='fieldSignInForm'>
                    <div className='labelField'>Password:</div>
                    <div className='valueField'>
                        <Field
                        name='password'
                        type='password'
                        error={errors.password}
                        placeholder='enter your password'
                        />
                    </div>
                </div>
                <div className='line'></div>
                <ModalFooter currentForm={currentForm} user={'login'}/>
            </form>
        </div>
    )
}
export default SignIn;

