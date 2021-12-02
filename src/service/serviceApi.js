import {client} from "./api";

export const getServices = async type => {
    try {
        const {data} = await client(`/api/service/${type}`)
        return data
    } catch (error) {
        return Promise.reject(error.response.data.message);
    }
}

export const addService = async service => {
    try {
        const formData = new FormData();
        formData.append('title', service.title);
        formData.append('type', service.type);
        formData.append('text', typeof service.text === 'object' ? JSON.stringify(service.text) : service.text);
        formData.append('photo', service.photo[0]);
        formData.append('contacts', typeof service.contacts === 'object' ? JSON.stringify(service.contacts) : service.contacts);
        formData.append('date', service.date ? `${new Date(`${service.date} ${service.dateTime} : 00`)}` : `${new Date()}`);
        formData.append('location', service.location);
        formData.append('userId', service.userId);
        const {data} = await client.post(`/api/services`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data;
    } catch (e) {
        return await Promise.reject(e.response.data.message);
    }
}

export const getService = async id => {
    try {
        const {data}=await client.get(`/api/serverces/id/${id}`);
        return data;
    }catch (e) {
        return await Promise.reject(e.response.data.message);
    }
}