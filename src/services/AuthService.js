import axios from 'axios';
import LocalStorageService from './LocalStorageService';

const server = process.env.REACT_APP_SERVER_URL
const PORTS = {
    FISHERS: 8801,
    PARTNERS: 8802,
    PUBLIC: 8803,
}

export default class AuthService {
    static login = ( data ) => {
        return new Promise((resolve, reject) => {
            const { user, password, org } = data
            const port = PORTS[org]

            axios.post(`${server}:${port}/user/enroll`, {
                id: user,
                secret: password
            })
            .then((res) => {
                LocalStorageService.clear()
                LocalStorageService.setApiProfile({ token: res.data.token, port })
                LocalStorageService.setUserProfile({ user, org })
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static reLogin = ( data ) => {
        return new Promise((resolve, reject) => {
            const { token, port } = data
            axios.post(`${server}:${port}/user/reenroll`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                //LocalStorageService.clear()
                LocalStorageService.setApiProfile({ token: res.data.token, port })
                //LocalStorageService.setUserProfile({ user, org })
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static isLoggedIn = () => {
        return LocalStorageService.getUserProfile() ? true : false
    }

    static getOrg = () => {
        return LocalStorageService.getUserProfile().org
    }

    static getProfile = () => {
        return LocalStorageService.getApiProfile()
    }

    static logOut = () => {
        LocalStorageService.clear()
    }
}