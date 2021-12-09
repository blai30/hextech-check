import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7071/api'
})

export default api
