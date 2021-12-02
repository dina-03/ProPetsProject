import './../../css/Post.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleRight, faCat, faDog, faUser} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import moment from "moment";

const Post = ({post}) => {
    const data = moment().format('D MMMM, HH:mm');

    return (
        <div className='post'>
            <div className='postHeader'>
                {post.avatar ? (
                    <div className='postHeaderIMG'>
                        <img src={`http://localhost:5010/${post.avatar}`}/>
                    </div>
                ) : (
                    <div className='usersAvatar'>
                        <FontAwesomeIcon icon={faUser} size='2x'/>
                    </div>
                )}

                <div className='postHeaderAuthor'>
                    <h3>{post.full_name}</h3>
                    <p>{data}</p>
                </div>

                <div className='postContent'>
                    <img src={`http://localhost:5010/${post.photo}`} alt='pets_photo'/>
                </div>

                <div className='postFooter'>
                    <h4>{post.title}</h4>
                    <Link to={`/postFullInfo/${post.id}`}>
                       <span> more <FontAwesomeIcon icon={faAngleDoubleRight} /></span>
                    </Link>
                    <div className='likeBoxPost'>
                        <p>  <FontAwesomeIcon icon={faThumbsUp}/> &nbsp; &nbsp;
                        {post.count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;


