import {client} from "./api";

export const getLikes = async () => {
    try {
        const {data} = await client.get(`/api/likes`);
        return data;
    } catch (error) {
        return await Promise.reject(error);
    }
};
export const addNewLike = async (postId, userId) => {
    try {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("postId", postId);
        const {data} = await client.post(`/api/likes/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        return await Promise.reject(error);
    }
};
export const addNewDislike = async (like) => {
    try {
        const {data} = await client.delete(`/api/likes/`, {data: {...like}});
        return data;
    } catch (error) {
        return await Promise.reject(error);
    }
};