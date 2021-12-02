import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    auth: false,
    loading: false,
    current: null
}

const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        authSuccess: state => {
            state.auth = localStorage.getItem('TOKEN') !== null;
        },
        startLoading: state => {
            state.loading = true;
        },
        stopLoading: state => {
            state.loading = false;
        },
        logout: state => {
            localStorage.removeItem('TOKEN');
            state.auth = false;
        },
        setCurrent: (state, {payload}) => {
            state.current = payload;

        }
    }
})

export default appReducer.reducer;

export const {authSuccess, startLoading, stopLoading, logout, setCurrent} = appReducer.actions;
export const appSelector = state => state.app;
export const authSelector = state => state.app.auth;
export const userSelector = state => state.app.current;
