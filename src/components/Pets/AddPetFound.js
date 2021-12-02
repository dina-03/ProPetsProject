import React, {useState} from "react";
import Field from "../Field";
import Button from "../Button";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../store/app";
import {set, useForm} from "react-cool-form";
import {addPetFoundAction} from "../../store/pet";
import * as yup from "yup";
import FormIcon from "../../img/addFormIcon.png";
import {useHistory} from "react-router-dom";

const AddPetFound = () => {
    const [file, loadFile] = useState(null);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    const foundSchema = yup.object().shape({
        type: yup.string().required(),
        sex: yup.string().required(),
        breed: yup.string().min(3).required(),
        color: yup.string().min(3).required(),
        height: yup.string().required(),
        features: yup.string().required(),
        description: yup.string().min(3).required(),
        location: yup.string().min(3).required(),
        image: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
    })

    const validateFoundForm = schema => async values => {
        let errors = {}
        try {
            await schema.validate(values, {abortEarly: false})
        } catch (yupError) {
            console.log(yupError)
            yupError.inner.forEach(({path, message}) =>
                set(errors, path, message)
            )
        }
        return errors
    }
    const {form, use} = useForm({
        defaultValues: {
            type: `Dog`,
            sex: "Male",
            breed: ``,
            color: ``,
            height: `20cm - 35cm`,
            features: ``,
            description: ``,
            location: ``,
            image: ``,
            email: user.email,
            phone: user.phone
        },
        validate: validateFoundForm(foundSchema),
        onSubmit: (values, {reset}) => {
            dispatch(addPetFoundAction({
                ...values,
                contacts: `${values.phone} ${values.email} ${user.full_name}`,
                userId: user.id,
                status: 'found'
            }))
            reset();
            history.push('/found')
        }
    })
    const errors = use("errors", {errorWithTouched: true})

    const onChangeHandler = ({target}) => {
        console.log(target.value)
        loadFile(target.value)
    }
    return(
        <div className='addLostFormContent'>
            <div className='lostFormTitle'>
            <h2><b>Found a pet?</b>  Please complete the form to help.</h2>
            </div>

            <form className='addFormPost' ref={form} noValidate>
                <div className='formBody'>
                    <div className='formFirstColumn'>

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
                                <label>Distinctive features: </label>
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
                        </div><div className='itemBoxForm'>
                        <div className='leftItemText'>
                            <label>Description:</label>
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
                                    className="btn-1"
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
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            error={errors.phone}
                        />
                    </div>
                    <div className='rightItemForm'>
                        <Field
                            type="text"
                            name="email"
                            placeholder="Email"
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
export default AddPetFound;