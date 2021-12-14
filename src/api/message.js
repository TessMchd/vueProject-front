import axios from "axios";

const BASE_URL = 'http://localhost/symfony-vue/public/index.php/api/messages'

async function getMessages () {
    return await axios.get(BASE_URL, {
        headers: {
            'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }})
}

async function getMessage (id) {
    return await axios.get(BASE_URL + '/' + id, {
        headers: {
            'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }})
}

async function postMessage (data) {
    return await axios.post(BASE_URL, data, {
        headers: {
            'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }})
}

async function updateMessage(data, id) {
    return await axios.put(BASE_URL+'/'+id, data, {
        headers: {
            'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }})
}

async function deleteMessage(id) {
    return await axios.delete(BASE_URL+'/'+id, {
        headers: {
            'Authorization': `Bearer ` + localStorage.getItem('usertoken')
        }})
}

export {getMessages, getMessage, postMessage, updateMessage, deleteMessage}