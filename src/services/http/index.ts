import axios from 'axios'

const http = axios
export const BASE_URL = 'https://dev-api.aao-tech.com/v1/'
const instanceAPI = axios.create({
  baseURL: BASE_URL,
})

export { http, instanceAPI }
