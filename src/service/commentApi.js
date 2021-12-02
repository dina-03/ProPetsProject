import {client} from "./api";

export const getComments= async ()=>{
    try {
        const {data}=await client.get(`/api/comments/`);
        return data;
    }catch (error) {
        return await Promise.reject(error)
    }
}

export const addNewComment=async (comment)=>{
    try {
        const formData = new FormData();
        formData.append('userId', comment.userId);
        formData.append('postId', comment.postId);
        formData.append('text', comment.text);
        const {data}=await client.post('/api/comments', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
        return data
    }catch (error) {
        return await Promise.reject(error);
    }
}