import { Server } from "socket.io"
import jwtSocketVerify from "../../middlewares/jwt-socket-verify"
import { SOCKET_CONNECT, SOCKET_DISCONNECT, SOCKET_MESSAGE_GET, SOCKET_MESSAGE_SEND, SOCKET_USER_IS_ONLINE } from "./socket.constants"
const SocketService = (server) => {
  const io = new Server(server, {
    cors: "*"
  })

  io.use(jwtSocketVerify)

  const user = new Set()
  
  io.on(SOCKET_CONNECT, (socket) => {
    if (!Array.from(user).some(u => u.id === socket.user.id)) {
      user.add({ ...socket.user, socketId: socket.id })
    }

    socket.on(SOCKET_MESSAGE_SEND, (data) => {
      const receiver = Array.from(user).find(u => u.id === data.receiver_id)

      if (receiver) {
        socket.to(receiver.socketId).emit(SOCKET_MESSAGE_GET, data)
      }
    })

    socket.on(SOCKET_USER_IS_ONLINE, (data) => {
      const { user_id } = data

      const isUserOnline = Array.from(user).some(u => u.id === user_id)

      socket.to(socket.id).emit(isUserOnline)
    })

    socket.on(SOCKET_DISCONNECT, () => {
      const deletedUser = Array.from(user).find(u => u.id === socket.user.id)
      user.delete(deletedUser)
    })

  })
  
  return (req, res, next) => {
    next()
  }
}

export default SocketService