import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}
const update = (changedPerson) => {
    return axios
    .put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    .then(response => response.data)
    .catch(error => {
        console.error('Error updating person:', error);
      });
}
export default {create, getAll, remove,update}