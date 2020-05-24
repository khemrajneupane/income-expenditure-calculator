import axios from 'axios'
const baseUrl = 'http://localhost:3001/transaction'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}
const deleteItem = (id) => {
 
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const createTransaction = async (newObject) => {

    const request = await axios.post(baseUrl, newObject)
    return request.data;
}


export default { getAll, deleteItem,createTransaction }