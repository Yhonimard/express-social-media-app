module.exports = (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    if (!token) throw new Error('Unauthorized')
    const data = jwt.verify(token, process.env.JWT_KEY)
    socket.user = { username: data.username, id: data.id }
    next()
  } catch (error) {
    return next(error)
  }

}