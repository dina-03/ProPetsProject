import {createSlice} from "@reduxjs/toolkit";
import {addNewComment} from "../service/commentApi";
import {startLoading, stopLoading} from "./app";
import {clearError, setError} from "./auth";
import {getPostAction} from "./post";

const initialState = {
    comments: []
}

const commentsReducer = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setPostComments: (state, {payload}) => {
            state.comments = payload;
        },
        addComment: (state, {payload}) => {
            state.comments.push(payload);
        }
    }
})

export default commentsReducer.reducer;

export const {setPostComments, addComment} = commentsReducer.actions;
export const commentsSelector = (state) => state.comments.comments;

export const addCommentAction = comment => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const response = await addNewComment(comment);
        dispatch(addComment(response));
        dispatch(getPostAction(response.postId, 1, 10))
    } catch (e) {
        dispatch(setError(e.message));
    } finally {
        dispatch(stopLoading());
    }
}