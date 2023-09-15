import axios from 'axios';

const server = process.env.REACT_APP_SERVER_URL
const url = "http://localhost:8080/ipfs/Qme3TSJNxEeWbYLFyKSpViT1eE6Gx9HLXrLo32fnLwzUZm"

export default class IpfsRepository {
    static get = (cid) => {
        return new Promise ((resolve, reject) => {
            axios.get(`${server}:8080/ipfs/${cid}`, {
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