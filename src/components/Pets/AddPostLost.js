import '../../css/Pets.css';
import FormIcon from './../../img/addFormIcon.png';
import Button from "../Button";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import {useForm, set} from "react-cool-form";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {userSelector} from "../../store/app";
import Field from "../Field";
import {addPetPostLost} from "../../store/pet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHistory} from "react-router-dom";

const AddPostLost = () => {
    const [file, loadFile] = useState(null);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    const yupSchema = yup.object().shape({
        nick: yup.string().min(2).required(),
        type: yup.string().min(1).required(),
        sex: yup.string().min(1).required(),
        breed: yup.string().min(2).required(),
        color: yup.string().min(2).required(),
        height: yup.string().min(1).required(),
        features: yup.string().min(1).required(),
        description: yup.string().min(1).required(),
        location: yup.string().min(1).required(),
        phone: yup.string().min(2).required(),
        email: yup.string().email("Invalid email").required(),
        image: yup.string().required(),
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
            status: `lost`,
            nick: ``,
            type: `Dog`,
            sex: `Male`,
            breed: ``,
            color: ``,
            height: `45-70cm`,
            features: ``,
            description: ``,
            location: ``,
            phone: user.phone,
            email: user.email,
            image: ``,
        },
        validate: validateWithYup(yupSchema),
        onSubmit: (values, {reset}) => {
            dispatch(
                addPetPostLost({
                    ...values,
                    contacts: `${values.phone} ${values.email} ${user.full_name}`,
                    userId: user.id,
                    status: "lost",
                })
            );
            reset();
            history.push('/lost')
        },
    });
    const errors = use("errors", {errorWithTouched: true});

    const onChangeHandler = ({target}) => {
        loadFile(target.value);
    };

    return (
        <div className='addLostFormContent'>
            <div className='lostFormTitle'><h2><b>Lost your buddy?</b> Keep calm and complete the form.</h2></div>
        <form className='addFormPost' ref={form} noValidate>
            <div className='formBody'>
                <div className='formFirstColumn'>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Nick: </label>
                        </div>
                        <div className='rightItemForm'>
                            <Field
                                placeholder="Uncle Sam"
                                name="nick"
                                error={errors.nick}
                            />
                        </div>
                    </div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Type: </label>
                        </div>
                        <div className='rightItemForm'>
                            <select name="type" error={errors.type}>
                                <option>Dog</option>
                                <option>Cat</option>
                                <option>Bird</option>
                                <option>Rabbit</option>
                                <option>Rodent</option>
                            </select>
                        </div>
                    </div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Gender: </label>
                        </div>
                        <div className='rightItemForm'>
                            <select name='sex' error={errors.sex}>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Breed: </label>
                        </div>
                        <div className='rightItemForm'>
                            <Field
                                placeholder="Golden Retriever"
                                name="breed"
                                error={errors.breed}
                            />
                        </div>
                    </div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Color: </label>
                        </div>
                        <div className='rightItemForm'>
                            <Field
                                placeholder="Gold"
                                name="color"
                                error={errors.color}
                            />
                        </div>
                    </div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Height: </label>
                        </div>
                        <div className='rightItemForm'>
                            <select name="height" error={errors.height}>
                                <option>45-70cm</option>
                                <option>30-45cm</option>
                                <option>10-30cm</option>
                            </select>
                        </div>
                    </div>
                    <div className='space'></div>
                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Distinctive features: <br/>
                                <span>up to 60 char</span>
                            </label>
                        </div>
                        <div className='rightItemFormDown'>
                            <textarea
                                name="features"
                                error={errors.features}
                                cols="30"
                                rows="3"
                                placeholder="blue collar with stars, no left ear, damaged tail."
                                maxLength="60"
                            />
                        </div>
                    </div>

                    <div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Description: <br/>
                                <span>up to 150 char</span></label>
                        </div>
                        <div className='rightItemFormDown'>
                            <textarea
                                name="description"
                                error={errors.description}
                                cols="30"
                                rows="6"
                                maxLength="150"
                                placeholder="brown fox jumps over a lazy dog. DJs flock by when jhkjk jhgMTV ax quiz prog. Junk MTV quiz graced by fox"
                            />
                        </div>
                    </div><div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Location: </label>
                        </div>
                        <div className='rightItemFormDown'>
                            <textarea
                                name="location"
                                error={errors.location}
                                cols="30"
                                rows="4"
                                placeholder="Oliver Platz, Berlin"
                                maxLength="60"
                            />
                        </div>
                    </div>

                </div>
                <div className='formSecondColumn'>
                    <div className='up'>
                        <img src={FormIcon} alt='icon'/>
                    </div>
                    <div className='down'>
                        <div className='petPhoto'>
                            <FontAwesomeIcon icon={faPaw} size='2x'/>
                        </div>
                        <Field
                            placeholder="load image "
                            defaultValue={file}
                            error={errors.image}
                            disabled
                            type="text"
                            name="loadImg"
                        />
                        <div className='downBtn'>
                            <Field
                                id='btn-1'
                                className='btnFile'
                                type="file"
                                name="image"
                                onChange={onChangeHandler}
                            />
                        </div>

                    </div>
                </div>

            </div>
            <hr/>
            <div className='formItemFooter'>
                <div className='leftItemText'>
                    <label>Contacts: </label>
                </div>
                <div className='rightItemForm'>
                    <Field
                    type='text'
                    placeholder='Phone'
                    name="phone"
                    error={errors.phone}
                    />
                </div><div className='rightItemForm'>
                    <Field
                        type='email'
                        placeholder='Email'
                        name="email"
                        error={errors.email}
                    />
            </div>
            </div>
            <div className='publishBtn'>
                <Button text={'Publish'} icon={faPaw}/>
            </div>
        </form>
        </div>
    )
}
export default AddPostLost;