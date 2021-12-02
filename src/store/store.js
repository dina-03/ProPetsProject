import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import app from "./app";
import auth from "./auth";
import services from "./service";
import posts from "./post";
import comments from './comment';
import pets from './pet';
import pagination from "./pagination";

const rootReducer = combineReducers({
    app,
    auth,
    posts,
    services,
    comments,
    pets,
    pagination
})

const store = configureStore({reducer: rootReducer})
export default store;