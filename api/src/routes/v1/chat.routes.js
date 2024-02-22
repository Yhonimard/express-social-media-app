import { Router } from "express";
import ChatController from "../../api/chat/chat.controller";
import ChatValidation from "../../api/chat/chat.validation";
import { API_CHAT_MESSAGE, API_CHAT_MESSAGE_ID, API_CHAT_MESSAGE_USER_ID, API_CHAT_USER, API_CHAT_USER_ID } from "../../fixtures/api";
import jwtVerify from "../../middlewares/jwt-verify";
import { Chat, Message, User, UserChat, sequelize } from "../../models";
import ChatService from "../../services/chat/chat.service";
const routes = Router()
const service = ChatService({
  chatRepo: Chat,
  sequelize,
  userChatRepo: UserChat,
  userRepo: User,
  messageRepo: Message
})
const controller = ChatController(service)
const validation = ChatValidation()

/**
 * @swagger
 *  tags:
 *    name: Chat
 *    description: the Chat api
 */
routes.route(API_CHAT_USER_ID)
  /**
   * @swagger
   * /api/v1/user/{id}/chat:
   *  post:
   *    summary: create chat
   *    tags: [Chat]
   *    description: api for create chat
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        description: user id
   *        schema:
   *          type: number
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      500:
   *        description: something went wrong
   */
  .post(jwtVerify, controller.createChat)


routes.route(API_CHAT_USER)
  /**
   * @swagger
   * /api/v1/user/chat:
   *  get:
   *    summary: get chats
   *    tags: [Chat]
   *    description: api for get chats
   *    parameters:
   *      - in: query
   *        name: pageNo
   *        description: the page number
   *        schema:
   *          type: number
   *          example: 1
   *      - in: query
   *        name: size
   *        description: the size of page
   *        schema:
   *          type: number
   *          example: 4
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getChats)

routes.route(API_CHAT_MESSAGE)
  /**
   * @swagger
   * /api/v1/chat/message:
   *  post:
   *    summary: send message
   *    tags: [Chat]
   *    description: api for send chats
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              media:
   *                type: string
   *              text:
   *                type: string
   *              receiver_id:
   *                type: number
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      500:
   *        description: something went wrong
   */
  .post(jwtVerify, controller.sendMessage)


routes.route(API_CHAT_MESSAGE_ID)
  /**
   * @swagger
   * /api/v1/chat/message/{id}:
   *  get:
   *    summary: get messages
   *    tags: [Chat]
   *    description: api for get messages
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        description: user id
   *        schema:
   *          type: number
   *      - in: query 
   *        name: pageNo 
   *        description: the page number
   *        schema:
   *          type: number
   *          example:  1
   *      - in: query 
   *        name: size
   *        description: the size of page
   *        schema:
   *          type: number
   *          example: 4 
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getMessages)




const chatRoutes = routes
export default chatRoutes
