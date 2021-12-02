import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import * as yup from "yup";
import {useForm, set} from "react-cool-form";
import {faPaw, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Field from "../Field";
import {userSelector} from "../../store/app";
import {addServiceAction} from "../../store/service";

const AddService = () => {
    const user = useSelector(userSelector);

    const dispatch = useDispatch()

    const [serviceType, setType] = useState("Walking")

    const onTypeHandler = ({target}) => setType(target.value)

    const yupSchema = yup.object().shape({
        title: yup.string().required(),
        type: yup.string(),
        text: yup.string().required(),
        photo: yup.string().required(),
        place: yup.string().required(),
        location: yup.string()
    })

    const walkingSchema = yup.object().shape({
        title: yup.string().required(),
        type: yup.string(),
        text: yup.string().required(),
        photo: yup.string().required(),
        place: yup.string().required(),
        date: yup.string().required(),
        dateTime: yup.string().required(),
        location: yup.string()
    })

    const specialSchema = yup.object().shape({
        title: yup.string().required(),
        type: yup.string(),
        phone: yup.string().required(),
        street: yup.string().required(),
        indexAndCity: yup.string().required(),
        fax: yup.string(),
        email: yup.string().email().required(),
        workhours: yup.string().required(),
        photo: yup.string().required(),
        contacts: yup.string().required()
    })

    const validateServiceForm = schema => async values => {
        let errors = {}
        try {
            await schema.validate(values, {abortEarly: false})
        } catch (yupError) {
            yupError.inner.forEach(({path, message}) =>
                set(errors, path, message)
            )
        }
        return errors
    }

    const {form, use} = useForm({
        defaultValues:
            serviceType === "Hotels" || serviceType === "VetHelp" ? {
                    title: ``,
                    type: `Walking`,
                    photo: ``,
                    phone: ``,
                    street: ``,
                    indexAndCity: ``,
                    fax: ``,
                    email: ``,
                    workhours: ``
                } :
                serviceType === "Walking" ?
                    {
                        title: ``,
                        type: `Walking`,
                        text: ``,
                        photo: ``,
                        place: ``,
                        date: ``,
                        location: ``
                    }
                    :
                    {
                        title: ``,
                        type: ``,
                        text: ``,
                        photo: ``,
                        place: ``,
                        location: ``
                    },
        validate: serviceType === "Hotels" || serviceType === "VetHelp" ?
            validateServiceForm(specialSchema) : serviceType === "Walking" ?
                validateServiceForm(walkingSchema) : validateServiceForm(yupSchema),
        onSubmit: (values, {reset}) => {
            if (values.type === "Hotels" || values.type === "VetHelp")
                dispatch(addServiceAction({
                    title: values.title,
                    type: values.type,
                    text: {
                        phone: `${values.phone}`,
                        street: `${values.street}`,
                        indexAndCity: `${values.indexAndCity}`,
                        fax: `${values.fax}`,
                        email: `${values.email}`,
                        workhours: `${values.workhours}`
                    },
                    photo: values.photo,
                    contacts: values.contacts,
                    userId: user.id
                }))
            else
                dispatch(addServiceAction({
                    title: values.title,
                    type: values.type,
                    text: values.text,
                    photo: values.photo,
                    contacts: {
                        address: values.place,
                        email: user.email,
                        userPhone: user.phone
                    },
                    location: values.location,
                    userId: user.id
                }))
            reset()
            setType("Walking")
        }
    })

    const errors = use("errors", {errorWithTouched: true})

    return (
        <div className="add-service">
            <h3>Your new service! Simplify text, add photo and publish.</h3>
            <hr/>

        </div>
    );
};

export default AddService;