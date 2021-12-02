import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:5010'
})

client.interceptors.response.use(
    response => {
        if (response.config.url.startsWith('/api/users/login')) {
            localStorage.setItem('TOKEN', response.headers['access-token'])
        }
        return response
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('TOKEN')
        }
        return Promise.reject(error)
    }
)
client.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem('TOKEN')}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export const registration = async ({email, password, name}) => {
    try {
        const {data} = await client.post('/api/users/registration', {email, password, full_name: name});
        localStorage.setItem('TOKEN', data.token)
        return data.user;
    } catch (error) {
        throw new Error('user is already exist')
    }
}

export const login = async ({email, password}) => {
    try {
        const {data} = await client.post('/api/users/login', {email, password})

        localStorage.setItem('TOKEN', data.token);
        return data.user;
    } catch (error) {
        throw new Error('wrong email or password')
    }
}
export {
    client
}