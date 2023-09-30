import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

let token

const setup = _token => {
  token = _token
}


instance.interceptors.request.use((req) => {
  if (req.url.startsWith("/post") || req.url.startsWith("/user/post")) {
    req.headers.setAuthorization(`Bearer ${token}`)
  }
  return req
})


export default {
  instance,
  setup
}