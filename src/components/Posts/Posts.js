import {useDispatch, useSelector} from "react-redux";
import {getPostsAction, postsSelector} from "../../store/post";
import Post from "./Post";
import {useEffect} from "react";
import './../../css/Post.css';
import {paginationSelector, setCurrentPageAction} from "../../store/pagination";


const Posts = () => {
    const posts = useSelector(postsSelector);
    const dispatch = useDispatch();
    const {currentPage, limit, pages} = useSelector(paginationSelector);
    const pagesArr = (number) => {
        const res = [];
        for (let i = 1; i <= number; i++) res.push(i);
        return res;
    }

    useEffect(() => {
        dispatch(getPostsAction(currentPage, limit));
    }, [dispatch, currentPage, limit]);

    return posts.length === 0 ? (
        <h2>No posts yet</h2>
    ):(
        <div className='postBox'>
            <div className="post-pagination">
                {pagesArr(pages).map((item) => (
                    <p
                        id={item}
                        onClick={(event) => {
                            dispatch(setCurrentPageAction(item));
                            event.target.classList.add("post-active-link");
                            Array.from(event.target.parentNode.children).map(
                                (link) =>
                                    event.target.id !== link.id
                                        ? link.classList.remove(
                                            "post-active-link"
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
            {posts.rows.map((post) => (
                <div key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    )
}
export default Posts;

/*(
        <div className='postBox'>
            {pagesArr(pages).map((item) => (
                <p
                    id={item}
                    onClick={(event) => {
                        dispatch(setCurrentPageAction(item));
                        event.target.classList.add("post-active-link");
                        Array.from(event.target.parentNode.children).map(
                            (link) =>
                                event.target.id !== link.id
                                    ? link.classList.remove(
                                        "post-active-link"
                                    )
                                    : ""
                        );
                    }}
                    key={item}
                >
                    {item}
                </p>
            ))}
            <h2>Post has not been added yet</h2>
        </div>
    ) : (
        <div className='postBox'>
            {posts.rows.map(post => (
                <div key={post.id}>
                    <Post post={post}/>
                </div>
            ))}
        </div>
    )*/

