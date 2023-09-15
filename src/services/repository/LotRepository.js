import axios from './axios';

export default class LotRepository {
    static start = (lot) => {
        return new Promise ((resolve, reject) => {
            axios.post(`/invoke/traceability/lot`, {
                method: "LotContract:start",
                args: [
                    JSON.stringify(lot)
                ]
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getCurrent = () => {
        return new Promise ((resolve, reject) => {
            axios.post(`/query/traceability/lot`, {
                method: "LotContract:getCurrent",
                args: []
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static get = (id) => {
        return new Promise ((resolve, reject) => {
            axios.post(`/query/traceability/lot`, {
                method: "LotContract:get",
                args: [ id ]
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static finish = (landing) => {
        return new Promise ((resolve, reject) => {
            axios.post(`/invoke/traceability/lot`, {
                method: "LotContract:finish",
                args: [
                    JSON.stringify(landing)
                ]
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    static getAll = () => {
        return new Promise ((resolve, reject) => {
            axios.post(`/query/traceability/lot`, {
                method: "LotContract:getAll",
                args: []
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}