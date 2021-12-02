import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faUser, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router-dom";
import {addDislikeAction, addLikeAction, getPostAction, postSelector,} from "../../store/post";
import {useDispatch, useSelector} from "react-redux";
import './../../css/Post.css';
import './../../css/Comment.css';
import {useEffect} from "react";
import moment from "moment";
import {userSelector} from "../../store/app";
import AddComment from "./AddComment";
import Comment from "./Comment";
import {setCurrentPageAction, paginationSelector} from "../../store/pagination";

const PostFullInfo = () => {
    const post = useSelector(postSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const like = post && post.likes.find(like => like.userId === user.id);
    const {id} = useParams();
    const {currentPage, pages, limit} = useSelector(paginationSelector);

    const pagesArr = (number) => {
        const res = [];
        for (let i = 1; i <= number; i++) res.push(i);
        return res;
    }

    useEffect(() => {
        dispatch(getPostAction(id, currentPage, limit));
    }, [dispatch, id, currentPage, limit]);

    const date = post ? moment().format('D MMMM, HH:mm') : false;

    const isLiked = post && post.likes.find(like => like.userId === user.id) && true;

    return (
        post && (<>
                <div>
                    {pagesArr(pages).map((item) => (
                        <p
                            id={item}
                            onClick={(event) => {
                                dispatch(setCurrentPageAction(item));
                                event.target.classList.add(
                                    "serviceActiveLink"
                                );
                                Array.from(
                                    event.target.parentNode.children
                                ).map((link) =>
                                    event.target.id !== link.id
                                        ? link.classList.remove(
                                            "serviceActiveLink"
                                        )
                                        : ""
                                );
                            }}
                            key={item}
                        >
                            {item}
                        </p>
                    ))}
                </div>
                <div className='fullPost'>
                    <div className='headerFullPost'>
                        {post.avatar ? (
                            <div className='fpHeaderIMG'>
                                <img src={`http://localhost:5010/${post.avatar}`} alt='user-avatar'/>
                            </div>
                        ) : (
                            <div className='fpHeaderIMG'>
                                <FontAwesomeIcon icon={faUser} size='3x'/>
                            </div>
                        )}
                        <div className='fpHeaderAuthor'>
                            <h3>{post.full_name}</h3>
                            <p>{date ? date : ''}</p>
                        </div>
                    </div>
                    <div className='fullPostContent'>
                        <img src={`http://localhost:5010/${post.photo}`} alt='pets photo'/>
                    </div>
                    <div className='fullPostFooter'>
                        <h4>{post.title}</h4>
                        <p>{post.text}</p>

                    </div>
                    <div className='fpLikeBoxPost'>
                        <p>{post.count} &nbsp; &nbsp;
                            {!isLiked ? (
                                <>
                                    <FontAwesomeIcon icon={faThumbsUp}/> &nbsp; &nbsp;
                                    <button className='likeBtn'
                                            onClick={() => dispatch(addLikeAction(post.id, user.id))}>
                                        Add like
                                    </button>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faThumbsDown}/> &nbsp; &nbsp;
                                    <button className='likeBtn' onClick={() => dispatch(addDislikeAction(like))}>
                                        Add dislike
                                    </button>
                                </>
                            )}</p>
                    </div>
                    <div className='comments'>
                        <h4>Comments</h4>

                        {post.comments.length === 0 ? (
                            <h3>No comment</h3>
                        ) : (
                            <div className='commentsPost'>
                                {post.comments.map((comment, index) => (
                                    <div key={index}>
                                        <Comment comment={comment}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <AddComment/>
                </div>
            </>
        )
    )
}
export default PostFullInfo;
