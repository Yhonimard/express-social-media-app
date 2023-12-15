const express = require("express")
const { Server } = require("socket.io")
const config = require("./config")
const jwt = require('jsonwebtoken')
if (process.env.NODE_ENV === "dev") require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const { port, client_url, constants } = config("/")

express.Router().use("/", (req, res, next) => {
  res.send()
})


const io = new Server({
  cors: {
    origin: client_url
  },
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const data = jwt.verify(token, process.env.JWT_KEY)
  socket.user = { username: data.username, id: data.id }
  next()
})

const user = new Set()


io.on('connection', (socket) => {
  if (!Array.from(user).some(u => u.id === socket.user.id)) {
    user.add({ ...socket.user, socketId: socket.id })
  }

  socket.on('send-message', (data) => {
    const receiver = Array.from(user).find(u => u.id === data.receiver_id)
    console.log(data);
    if (receiver) {
      console.log("run");
      socket.to(receiver.socketId).emit('get-messages', data)
    }
  })

  socket.on('disconnect', () => {
    const deletedUser = Array.from(user).find(u => u.id === socket.user.id)
    user.delete(deletedUser)
  })
})




const PORT = port || 3001
io.listen(PORT, () => {
  console.log('run on port 3001');
})