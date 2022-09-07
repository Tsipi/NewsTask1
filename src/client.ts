import axios from 'axios'

export const client = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
    headers: { 
      'Content-Type': 'application/json', 
    },
})