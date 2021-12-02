import {createSlice} from "@reduxjs/toolkit";
import {getPosts, addNewPost, getPost} from "../service/postApi";
import {addNewDislike, addNewLike} from "../service/likeDislikeApi";
import {setCurrent, startLoading, stopLoading} from "./app";
import {clearError, setError} from "./auth";

const initialState = {
    posts: [],
    post: null,
    likes: []
}

const postsReducer = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, {payload}) => {
            state.posts = payload;
        },
        addPost: (state, {payload}) => {
            state.posts.push({...payload});
        },
        setCurrentPost: (state, {payload}) => {
            state.post = payload;
        },
        addLike: (state, {payload}) => {
            state.likes.push(payload);
        },
        addDislike: (state, {payload}) => {
            state.likes.splice(payload);
        },
    },
});

export default postsReducer.reducer;

export const getPostsAction = () => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const posts = await getPosts();
        dispatch(setPosts(posts));
    } catch (error) {
        dispatch(setError(error.message))
    } finally {
        dispatch(stopLoading());
    }
}
export const getPostAction = (id) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const post = await getPost(id);
        dispatch(setCurrentPost(post))
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(stopLoading());
    }
};

export const addPostAction = (post) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const response=await addNewPost(post);
        dispatch(addPost(response));
    }catch (error) {
        dispatch(setError(error.message))
    }finally {
        dispatch(stopLoading());
    }
}
export const addLikeAction = (postId, userId) => async (dispatch) => {
    dispatch(clearError());
    try {
        const response = await addNewLike(postId, userId);
        dispatch(addLike(response));
        dispatch(getPostAction(response.postId));
    } catch (e) {
        dispatch(setError(e.message));
    }
};

export const addDislikeAction = (like) => async (dispatch) => {
    dispatch(clearError());
    try {
        await addNewDislike(like);
        dispatch(getPostAction(like.postId));
    } catch (e) {
        dispatch(setError(e.message));
    }
};
export const { setPosts, addPost, setCurrentPost, addLike, addDislike } = postsReducer.actions;
export const postsSelector = (state) => state.posts.posts;
export const postSelector = (state) => state.posts.post;