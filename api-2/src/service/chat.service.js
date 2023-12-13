import db from "../config/db"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiConflictError from "../exception/ApiConflictError"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import mongoError from "../exception/mongo-error"
import ChatModel from "../model/chat.model"

const ChatService = () => {
  const chatRepo = ChatModel

  const createChat = async (currentUser, data) => {
    try {
      const { userId } = data

      if (currentUser.userId === userId) throw new ApiBadRequestError("you cant create chat with yourself")

      const chat = await chatRepo.findOne()
        .where("users").all([currentUser.userId, userId])
        .exec()

      if (chat) throw new ApiConflictError("chat already exists")

      const newChat = new chatRepo({
        users: [currentUser.userId, userId]
      })

      await newChat.save()

      return {
        message: "success create chat"
      }
    } catch (error) {
      throw mongoError(error)
    }
  }

  const getUserChats = async (currentUser) => {
    try {

      const chats = await chatRepo.find()
        .where("users").in([currentUser.userId])
        .select("-message")


      const chatsMapping = chats
        .map(c => c.toObject({ getters: true }))
        .map(({ users, ...c }) => ({
          ...c,
          from: users.find(u => u === currentUser.userId),
          to: users.find(u => u !== currentUser.userId),
        }))

      return chatsMapping
    } catch (error) {
      throw mongoError(error)
    }
  }

  const getChat = async (currentUser, params) => {
    try {
      const { userId } = params

      if (currentUser.userId === userId) throw new ApiConflictError("you cannot chat yourself")

      const chat = await chatRepo.findOne()
        .where("users").all([currentUser.userId, userId])
        .select({ message: 0 }).exec()

      if (!chat) throw new ApiNotFoundError("chat not found")

      const chatObj = chat.toObject({ getters: true })

      const chatMapper = {
        ...chatObj,
        users: {
          from: chatObj.users.find(u => u === currentUser.userId),
          to: chatObj.users.find(u => u === userId)
        }
      }

      return chatMapper
    } catch (error) {
      throw error
    }
  }

  return {
    createChat,
    getUserChats,
    getChat
  }
}

export default ChatService
