import axios from "axios"

const request = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

let token;

const setup = _token => token = _token

request.interceptors.request.use(config => {
  if (
    config.url.startsWith("/post") ||
    config.url.startsWith("/user") ||
    config.url.startsWith('/friend')
  ) {
    config.headers.setAuthorization(`Bearer ${token}`)
  }
  return config
})

export default {
  request,
  setup
}
