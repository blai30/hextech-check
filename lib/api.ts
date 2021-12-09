import axios from 'axios'

const api = axios.create({
  baseURL: 'https://blai30hextechcheck.azurewebsites.net/api'
})

export default api
