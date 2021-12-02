import React, {useState} from "react";
import Button from "./Button";
import {faSave, faPencilAlt, faUser, faDog} from "@fortawesome/free-solid-svg-icons";
import './../css/UserForm.css';
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../store/app";
import {useForm, set} from "react-cool-form";
import * as yup from "yup";
import {updateAction} from "../store/auth";
import './../css/UserForm.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Field from "./Field";

const UserFormProfile = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [userFullName, setUserName] = useState(user.full_name);

    const yupSchema = yup.object().shape({
        full_name: yup.string(),
        avatar: yup.string(),
        email: yup.string().email(),
        phone: yup.string(),
        user_pet: yup.string(),
        nick: yup.string(),
        pet_photo: yup.string()
    })

    const validateWithYup = (schema) => async (values) => {
        let errors = {};
        try {
            await schema.validate(values, {abortEarly: false});
        } catch (yupError) {
            yupError.inner.forEach(({path, message}) =>
                set(errors, path, message)
            );
        }
        return errors;
    };

    const {form, use} = useForm({
        defaultValues: user
            ? {
            full_name: `${user.full_name}`,
            avatar: `${user.avatar}`,
            email: `${user.email}`,
            phone: `${user.phone}`,
            user_pet: `${user.user_pet}`,
            nick: `${user.nick}`,
            pet_photo: `${user.pet_photo}`,
        }
        : {
            full_name: ``,
            avatar: ``,
            email: `${"email"}`,
            phone: `${"phone"}`,
            user_pet: `${"pet"}`,
            nick: `${"nick"}`,
            pet_photo: `${"pet_photo"}`,
        },

        validate: validateWithYup(yupSchema),
        onSubmit: (values) => {
            const data = {id: user.id, ...values};
            dispatch(updateAction(data));
        }
    });
    const errors = use("errors", {errorWithTouched: true});
    const onChangeHandler = (e) => {
        setUserName(e.target.value);
    }

    return user && (
        <div className='userForm'>
            <div className='userFormTitle'>
                <h2><b> Your profile.</b> Change, edit and manage your data.</h2>
            </div>
            <div className='myProfileTitle'>My profile</div>
            <div className='userFormHeader'>
                {user.avatar ? (
                        <div className='userFormAvatar'>
                            <img src={`http://localhost:5010/${user.avatar}`} alt='avatar'/>
                        </div>
                    ) :
                    (<div className='avatar'>
                        <FontAwesomeIcon size='2x' icon={faUser}/>
                    </div>)}
                <div className='fullName'>
                    <h3>{user.full_name}</h3>
                </div>
                {/*<button className='editBtn'>
                    <FontAwesomeIcon icon={faPencilAlt}/>
                </button>*/}

            </div>
            {user && (
                <form className='profileFormUser' ref={form} noValidate>
                    <div className='formUserContent'>
                        <div className='label'>Full name:</div>
                        <div className='inputForm'>
                            <Field
                                defaultValue={user.full_name}
                                placeholder='full_name'
                                onChange={onChangeHandler}
                                error={errors.full_name}
                            />
                        </div>
                    </div>
                    <div className='formUserContent'>
                        <div className='label'>Email:</div>
                        <div className='inputForm'>
                            <Field
                                name='email'
                                placeholder='email'
                                error={errors.email}
                            />
                        </div>
                    </div>
                    <div className='formUserContent'>
                        <div className='label'>Phone:</div>
                        <div className='inputForm'>
                            <Field
                                name='phone'
                                placeholder='phone'
                                error={errors.phone}
                            />
                        </div>
                    </div>
                    <div className='formUserContent'>
                        <div className='label'>Avatar:</div>
                        <div className='inputForm'>
                            <Field
                                type='file'
                                name='avatar'
                                placeholder='avatar'
                                error={errors.avatar}
                                className='btnFile'
                            />
                            <input placeholder={user.avatar} name='avatar'/>
                        </div>
                    </div>
                    <div className='formPetContent'>
                        <div className='petContentText'>
                            <div className='formUserContent'>
                                <div className='label'>My pet:</div>
                                <div className='inputForm'>
                                    <Field
                                        name='user_pet'
                                        placeholder='user_pet'
                                        error={errors.user_pet}
                                    />
                                </div>
                            </div>
                            <div className='formUserContent'>
                                <div className='label'>Nick:</div>
                                <div className='inputForm'>
                                    <Field
                                        name='nick'
                                        placeholder='nick'
                                        error={errors.nick}
                                    />
                                </div>
                            </div>
                            <div className='formUserContent'>
                                <div className='label'>Photo:</div>
                                <div className='inputForm'>
                                    <Field
                                        type='file'
                                        name='pet_photo'
                                        placeholder='photo'
                                        error={errors.pet_photo}
                                    />
                                    <input placeholder={user.pet_photo} name='pet_photo'/>
                                </div>
                            </div>
                        </div>

                        <div className='petContentPhoto'>

                            {user.pet_photo ? (
                                    <div className='petPhotoAvatar'>
                                        <img src={`http://localhost:5010/${user.pet_photo}`} alt='pets avatar'/>
                                    </div>
                                ) :
                                (<div className='petPhoto'>
                                    <FontAwesomeIcon icon={faDog} size='3x'/>
                                </div>)}
                        </div>
                    </div>
                    <div className='btnSaveBox'>
                        <Button className='btnSave' icon={faSave} name='update' text='Save changes'/>
                    </div>
                </form>
            )}
        </div>

    )
}
export default UserFormProfile;