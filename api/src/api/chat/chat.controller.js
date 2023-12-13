import httpStatus from "http-status"

const ChatController = (service) => {

  const createChat = async (req, res, next) => {
    try {
      await service.createChat(req.user, req.params)
      res.status(httpStatus.CREATED).json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const getChats = async (req, res, next) => {
    try {
      const result = await service.getChats(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const sendMessage = async (req, res, next) => {
    try {
      await service.sendMessage(req.user, req.body)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }
  const getMessages = async (req, res, next) => {
    try {
      const result = await service.getMessages(req.user, req.params, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }
  return {
    createChat,
    getChats,
    sendMessage,
    getMessages
  }
}
export default ChatController