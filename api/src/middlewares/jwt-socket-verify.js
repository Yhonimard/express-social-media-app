import config from "../config"
import jwt from "jsonwebtoken"

const jwtSocketVerify = (socket,next) => {
  const { jwtkey } = config("/")
  
  const token = socket.handshake.auth.token
  const data = jwt.verify(token, jwtkey)
  socket.user = { username: data.username, id: data.id }
  next()
}

export default jwtSocketVerify