import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currenPage: 1,
    limit: 4,
    pages: null
}

const paginationReducer = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, {payload}) => {
            state.currenPage = payload;
        },
        setPagination: (state, {payload}) => {
            state.limit = payload.limit;
            state.pages = Math.ceil(payload.total / payload.limit)
        },
        resetPagination: (state, {payload}) => {
            state.currenPage = payload;
        }
    }
})

export default paginationReducer.reducer;

export const {setCurrentPage, setPagination, resetPagination} = paginationReducer.actions;
export const paginationSelector = (state) => state.pagination;
export const setCurrentPageAction = (page) => async (dispatch) => {
    dispatch(setCurrentPage(page));
}