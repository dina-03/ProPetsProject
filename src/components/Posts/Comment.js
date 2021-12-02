import moment from "moment";
import './../../css/Comment.css';

const Comment=({comment})=>{
    const date=moment().format('D MMMM, HH:mm');

    return (
        <div className='userComment'>
            <span>
              <b> {comment.user.full_name} </b> | {date}
            </span>
            <p>{comment.text}</p>
        </div>
    )
}
export default Comment;