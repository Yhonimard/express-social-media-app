import httpStatus from "http-status";
import ChatService from "../service/chat.service";

const ChatController = () => {
  const service = ChatService();

  const createChat = async (req, res, next) => {
    try {
      const response = await service.createChat(req.user, req.params);
      res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getUserChats = async (req, res, next) => {
    try {
      const response = await service.getUserChats(req.user);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getChat = async (req, res, next) => {
    try {
      const response = await service.getChat(req.user, req.params);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  return {
    createChat,
    getUserChats,
    getChat,
  };
}

export default ChatController;
