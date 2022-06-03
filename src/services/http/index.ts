import axios from 'axios'

const http = axios

const instanceAPI = axios.create({
  baseURL: 'https://dev-api.aao-tech.com/v1/',
})

export { http, instanceAPI }
