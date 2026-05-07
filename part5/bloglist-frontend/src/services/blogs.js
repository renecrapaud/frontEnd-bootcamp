import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl + "/" + newObject.id, newObject, config)
  return response.data
}

const sendDeletionReq = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + "/" + id, config)
  return response.data
}

export default { getAll, createNew, setToken, updateLike, sendDeletionReq }
