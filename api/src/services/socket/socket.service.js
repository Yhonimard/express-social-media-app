import { Server } from "socket.io"
import jwtSocketVerify from "../../middlewares/jwt-socket-verify"
import { SOCKET_CONNECT, SOCKET_DISCONNECT, SOCKET_MESSAGE_GET, SOCKET_MESSAGE_SEND, SOCKET_USER_IS_ONLINE_GET } from "./socket.constants"

const SocketService = (server) => {
  const io = new Server(server, {
    path: '/api/socket.io',
    cors: {
      origin: '*'
    },
    transports: ['websocket', 'polling']
  })

  io.use(jwtSocketVerify)

  const user = new Set()

  io.on(SOCKET_CONNECT, (socket) => {
    if (!Array.from(user).some(u => u.id === socket.user.id)) {
      user.add({ ...socket.user, socketId: socket.id })
    }

    const user_online = Array.from(user).map(u => u.id)
    socket.emit(SOCKET_USER_IS_ONLINE_GET, user_online)
    socket.broadcast.emit(SOCKET_USER_IS_ONLINE_GET, Array.from(user).map(u => u.id))

    socket.on(SOCKET_MESSAGE_SEND, (data) => {
      const receiver = Array.from(user).find(u => u.id === data.receiver_id)
      if (receiver) {
        socket.to(receiver.socketId).emit(SOCKET_MESSAGE_GET, data)
      }
    })

    socket.on(SOCKET_DISCONNECT, () => {
      const deletedUser = Array.from(user).find(u => u.id === socket.user.id)
      user.delete(deletedUser)
      const user_online = Array.from(user).map(u => u.id)
      io.emit(SOCKET_USER_IS_ONLINE_GET, user_online)
    })

  })

  return (req, res, next) => {
    next()
  }
}

export default SocketService
