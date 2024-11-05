import axios from "axios"

const url = "https://redux-toolkit-jobster-api-server.onrender.com/api/v1"
const customFetch = axios.create({
  baseURL: url,
})

export default customFetch
