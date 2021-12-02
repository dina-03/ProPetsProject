import {createSlice} from "@reduxjs/toolkit";
import {authSuccess, logout, setCurrent, startLoading, stopLoading} from "./app";
import {login, registration} from "../service/api";
import {check, getUserById, updateUser} from "../service/userApi";

const initialState = {
    error: null
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, {payload}) => {
            state.error = payload.error
        },
        clearError: state => {
            state.error = null;
        }
    }
})

export default authReducer.reducer;
export const {setError, clearError} = authReducer.actions;

export const checkAuthAction = () => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const {user} = await check();
        dispatch(setCurrent(user));
        dispatch(authSuccess());
    } catch (e) {
        dispatch(setError({data: e.data, status: e.status}));
    } finally {
        dispatch(stopLoading());
    }
}

export const loginAction = (values) => {
    return async dispatch => {
        dispatch(startLoading());
        dispatch(clearError());
        try {
            const user = await login(values);
            dispatch(authSuccess());
            dispatch(setCurrent(user));
        } catch (error) {
            dispatch(setError({error: error.message}))
        } finally {
            dispatch(stopLoading());
        }
    }
}

export const registrationAction = (userData) => {
    return async dispatch => {
        dispatch(startLoading());
        dispatch(clearError());
        try {
            const user = await registration(userData);
            dispatch(authSuccess());
            dispatch(setCurrent(user));
        } catch (error) {
            dispatch(setError({error: error.message}));
        } finally {
            dispatch(stopLoading())
        }
    }
}

export const logoutAction = () => async (dispatch) => {
    dispatch(logout());
    dispatch(setCurrent(null))
}

export const getUserByIdAction = () => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const user = await getUserById();
        console.log(user)
        dispatch(setCurrent(user))

    } catch (error) {
        dispatch(setError(error))
    } finally {
        dispatch(stopLoading());
    }
}

export const updateAction = (obj, avatarOld, petPhotoOld) => async (dispatch) => {
        dispatch(startLoading());
        dispatch(clearError());
        try {
            const user = await updateUser(obj, avatarOld, petPhotoOld);
            dispatch(setCurrent(user));
        } catch (e) {
            dispatch(setError({ data: e.data, status: e.status }));
        } finally {
            dispatch(stopLoading());
        }
    };

export const errorSelector = (state) => state.auth.error;

/*export const updateAction = (object) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const user = await updateUser(object);
        dispatch(setCurrent(user))
    } catch (error) {
        dispatch(setError(error))
    } finally {
        dispatch(stopLoading());
    }
}*/