import {client} from "./api";

export const getPets = async (status) => {
    try {
        const {data} = await client.get(`/api/pets/${status}`);
        return data;

    } catch (error) {
        return await Promise.reject(error.response.data.message)
    }
}

export const addNewPostLost = async (post) => {
    try {
        const formData = new FormData();
        formData.append("status", post.status);
        formData.append("nick", post.nick);
        formData.append("type", post.type);
        formData.append("image", post.image[0]);
        formData.append("sex", post.sex);
        formData.append("breed", post.breed);
        formData.append("color", post.color);
        formData.append("height", post.height);
        formData.append("features", post.features);
        formData.append("description", post.description);
        formData.append("location", post.location);
        formData.append("contacts", post.contacts);
        formData.append("userId", post.userId);
        const {data} = await client.post(`/api/pets`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return data;
    } catch (e) {
        return await Promise.reject(e.response.data.message)
    }
}

export const getPet = async (id) => {
    try {
        const {data} = await client.get(`api/pets/id/${id}`);
        return data;
    } catch (error) {
        return await Promise.reject(error.response.data.message);
    }
}

export const addFoundPet = async (pet) => {
    try {
        const formData = new FormData();
        formData.append("type", pet.type);
        formData.append("breed", pet.breed);
        formData.append("sex", pet.sex);
        formData.append("color", pet.color);
        formData.append("height", pet.height);
        formData.append("features", pet.features);
        formData.append("description", pet.description);
        formData.append("image", pet.image[0]);
        formData.append("location", pet.location);
        formData.append("contacts", pet.contacts);
        formData.append("userId", pet.userId);
        formData.append("status", pet.status);
        const {data} = await client.post(`/api/pets`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    } catch (error) {
        return await Promise.reject(error.response.data.message)
    }
}

export const petUpdate = async (id, status, contacts) => {
    try {
        const {data} = await client.put(`/api/pets/${id}`, {status, contacts});
        return data;
    } catch (error) {
        return await Promise.reject(error.response);
    }
}

export const deletePet = async (id) => {
    try {
        const {data} = await client.delete(`/api/pets/${id}`)
        return data;
    } catch (e) {
        return await Promise.reject(e.response);
    }
}