import './../../css/Comment.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-cool-form";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {userSelector} from "../../store/app";
import {addCommentAction} from "../../store/comment";

const AddComment = () => {
    const user = useSelector(userSelector);
    const {id} = useParams();
    const dispatch = useDispatch();
    const {form} = useForm({
        defaultValues: {
            text: '',
            postId: `${id}`,
            userId: `${user.id}`
        },
        onSubmit: (values, {reset}) => {
        dispatch(addCommentAction(values));
        reset();
        }
    });

    return (
        <div className='addComment'>
            <form ref={form} className='addFormComment'>
                <textarea
                placeholder='type your comment'
                rows={3}
                name='text'
                />
                <div className='footerComment'>
                    <FontAwesomeIcon icon={faComments}/>
                    <button className='addCommentBtn'>Add comment</button>
                </div>
            </form>
        </div>
    )
}
export default AddComment;