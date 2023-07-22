import 'dotenv/config'
import axios from 'axios'
import data from '../data/payload.json'

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`

export const userList = async () => {
    return await axios.post(`${baseUrl}/graphql`, data, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjg2NzU0NTg4LCJleHAiOjE2ODY5MjczODh9.H2Jl5IppUyBdtJdhQe45eT33uRLgYXPzX-qewFu7d9U',
            "Content-Type": 'application/json'
        }
    })
}