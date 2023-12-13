const express = require("express")
const { Server } = require("socket.io")
if (process.env.NODE_ENV === "dev") require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })


const io = new Server({
  cors: {
    origin: process.env.CLIENT_URI
  }
})

io.on("connection", (socket) => {
})


io.listen(process.env.PORT || 3001)
