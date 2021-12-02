import React from "react";
import {client} from "./api";
import jwtDecode from "jwt-decode";

export const check = async () => {
    try {
        const {data} = await client.get(`/api/users/auth`);
        localStorage.setItem('TOKEN', data.token)
        return {token: jwtDecode(data.token), user: data.user}
    } catch (error) {
        if (error.response.status === 401) localStorage.removeItem('token')
        return await Promise.reject(error.response.data.message)
    }
}

export const getCurrentUser = () => {
    return localStorage.getItem('TOKEN')
        ? jwtDecode(localStorage.getItem('TOKEN')) : null
}

export const getUserById = async () => {
    try {
        const response = client.get(`/api/users/${getCurrentUser().id}`);
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response);
    }
}

export const updateUser = async ({id, full_name, avatarPhotoOld, petPhotoOld, ...rest}) => {
    try {
        const formData = new FormData();
        formData.append("full_name", full_name);
        formData.append("avatar", rest.avatar && rest.avatar[0]);
        formData.append("email", rest.email);
        formData.append("phone", rest.phone);
        formData.append("user_pet", rest.user_pet);
        formData.append("nick", rest.nick);
        formData.append("pet_photo", rest.pet_photo && rest.pet_photo[0]);
        formData.append("pet_photo_old", petPhotoOld);
        formData.append("avatar_old", avatarPhotoOld);
        const {data} = await client.put(`/api/users/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data
    } catch (error) {
        return await Promise.reject(error.response.data.message)
    }
}