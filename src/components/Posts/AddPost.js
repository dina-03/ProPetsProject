import React, {useState} from "react";
import Button from "../Button";
import {faPaw, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../store/app";
import {addPostAction} from "../../store/post";
import {useForm, set} from "react-cool-form";
import * as yup from 'yup';
import './../../css/AddPost.css';

const AddPost = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [file, loadFile] = useState(null);

    const yupSchema = yup.object().shape({
        title: yup.string().min(3),
        text: yup.string().min(3),
        photo: yup.string()
    });

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
        defaultValues: {
            title: '',
            text: '',
            photo: ''
        },
        validate: validateWithYup(yupSchema),
        onSubmit: (values, {reset}) => {
            dispatch(addPostAction({...values, userId: user.id}));
            reset();
        },
    });
    const errors = use('errors', {errorWithTouched: true});

    const onChangeHandler = ({target}) => {
        loadFile(target.value);
    }

    return (
        <div className='addPost'>
            <h4><b>Your new post!</b> Simply text, add photo and publish.</h4>
            <hr/>
            <form ref={form} className='addPostForm'>
                <div className='pfLabel'>
                    <label>Title:</label>
                </div>
                <div className='pfInput'>
                    <input
                        className='pfLabelAdd'
                        placeholder='type your title'
                        name='title'
                        error={errors.title}
                    />
                </div>
                <div className='space'></div>
                <div className='pfLabel'>
                    <label>Text: <br/>
                    <span>up 150 char</span></label>
                </div>
                <div className='pfInput'>
                    <textarea
                        className='pfLabelAddText'
                        name='text'
                        placeholder='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.'
                        error={errors.text}
                    />
                </div>

                <div className='pfLabel'>
                    <label>Photo:</label>
                </div>
                <div className='pfInput'>
                    <input className='pfLabelAdd' type='file' name='photo' error={errors.photo}/>
                </div>

                <div>
                    <div className='postUserData'>
                        {user && user.avatar ? (
                            <div className='addUsersAvatarToPost'>
                                <img src={`http://localhost:5010/${user.pet_photo}`} alt='avatar'/>
                            </div>
                        ) : (
                            <div className='usersAvatar'>
                                <FontAwesomeIcon icon={faUser} size='2x'/>
                            </div>
                        )}
                        <div className='userAvatarTitle'>{user && user.nick}</div>

                    </div>
                    <div className='publishBtn'><Button text={'Publish'} icon={faPaw}/></div>

                </div>
            </form>
        </div>
    )
}
export default AddPost;