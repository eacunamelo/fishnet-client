import axios from 'axios'
import AuthService from '../AuthService';
import LocalStorageService from '../LocalStorageService'

// Agrega interceptor a requests
const instance = axios.create()

instance.interceptors.request.use(
    config => {
        const server = process.env.REACT_APP_SERVER_URL
        if (AuthService.isLoggedIn()) {
            const port = LocalStorageService.getApiProfile().port
            config.baseURL = `${server}:${port}`
        }

        const token = LocalStorageService.getApiProfile().token
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Agrega interceptor a responses
instance.interceptors.response.use((res) => {
    console.log(res.data.response)
    return res.data.response
}, function (error) {
    return Promise.reject(error);
});

export default instance