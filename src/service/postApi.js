import {client} from './api';

export const getPosts = async () => {
    try {
        const {data} = await client.get('/api/posts');
        return data
    } catch (error) {
        return await Promise.reject(error);
    }
}

export const getPost = async (id) => {
    try {
        const {data} = await client.get(`/api/posts/${id}`);
        return data;
    } catch (error) {
        return await Promise.reject(error)
    }
};

export const addNewPost = async (post)=>{
    try {
        const formData=new FormData();
        formData.append('title', post.title);
        formData.append('text', post.text);
        formData.append('photo', post.photo[0]);
        formData.append('userId', post.userId);
        const {data}=await client.post(`/api/posts/`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return data
    }catch (error) {
        return await Promise.reject(error);
    }
}

