import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteEntry = (id) => {
    console.log(id)
    return axios.delete(`${baseUrl}/${id}`).then(response => {
        alert('Entry deleted')
    }).catch((error)=>{
        console.log(error)
        alert('Error while deleting entry')
    })
}

export default { getAll, create, update, deleteEntry }