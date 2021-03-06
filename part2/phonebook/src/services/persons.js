import axios from 'axios'
const baseUrl = '/api/persons'

export const getAll = () => {
    return axios.get(baseUrl)
}

export const create = newObject => {
    return axios.post(baseUrl, newObject)
}

export const Delete = objectID => {
    return axios.delete(`${baseUrl}/${objectID}`)
}

export const update = (objectID, newObject) => {
    return axios.put(`${baseUrl}/${objectID}`, newObject)
}