import {createSlice} from "@reduxjs/toolkit";
import {startLoading, stopLoading} from "./app";
import {clearError, setError} from "./auth";
import {addFoundPet, getPet, addNewPostLost, getPets, petUpdate, deletePet} from "../service/petApi";

const initialState = {
    pets: null,
    currentPet: null
}

const pet = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        setPets: (state, {payload}) => {
            state.pets = payload;
        },
        setCurrentPet: (state, {payload}) => {
            state.currentPet = payload;
        },
        petUpdateStatus: (state, {payload}) => {
            state.pets = state.filter((item) => item.id !== payload);
        }
    }
})

export const {setPets, setCurrentPet, petUpdateStatus} = pet.actions;
export const petsSelector = (state) => state.pets;

export const getPetsAction = (status) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const pets = await getPets(status);
        dispatch(setPets(pets));
    } catch (e) {
        dispatch(setError({data: e.data, status: e.status}));
    } finally {
        dispatch(stopLoading());
    }
}

export const getPetAction = (id) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const pet = await getPet(id);
        dispatch(setCurrentPet(pet));
    } catch (e) {
        setError({data: e.data, status: e.status});
    } finally {
        dispatch(stopLoading());
    }
}
export const addPetFoundAction = (pet) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        await addFoundPet(pet);
    } catch (e) {
        dispatch(setError({data: e.data, status: e.status}));
    } finally {
        dispatch(stopLoading());
    }
}

export const addPetPostLost = (pet) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        await addNewPostLost(pet);
    } catch (e) {
        dispatch(setError({data: e.data, status: e.status}))
    } finally {
        dispatch(stopLoading());
    }
}

export const addPetPostFound = (pet) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        await addFoundPet(pet)
    } catch (e) {
        dispatch(setError({ data: e.data, status: e.status }));
    } finally {
        dispatch(stopLoading());
    }
}

export const petUpdateAction = (id, status, contacts) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        await petUpdate(id, status, contacts);
        dispatch(petUpdateStatus(id));
    } catch (e) {
        setError({ data: e.data, status: e.status });
    } finally {
        dispatch(stopLoading());
    }
}

export const deletePetAction = (id) => async (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError());
    try {
        const  text =await deletePet(id);
        console.log('Text',text)
    } catch (e) {
        setError({ data: e.data, status: e.status });
    }finally {
        dispatch(startLoading());
    }
}

export default pet.reducer;