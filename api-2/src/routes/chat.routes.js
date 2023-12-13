import { Router } from "express";
import ChatController from "../controller/chat.controller";
import jwtVerify from "../middleware/jwt-verify";

const routes = Router()
const controller = ChatController()


/**
 * @swagger
 *  tags:
 *    name: Chat
 *    description: The Chat api
 */

routes.route("/chat/:userId")
  /**
   * @swagger
   * /api/v1/chat/{userId}:
   *  post:
   *    summary: create chat
   *    tags: [Chat]
   *    description: api for create chat
   *    parameters:
   *      - in: path
   *        name: userId
   *        description: user id
   *        schema:
   *          type: string
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      201:
   *        description: success 
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .post(jwtVerify, controller.createChat)

routes.route("/user/chat")
  /**
   * @swagger
   * /api/v1/user/chat:
   *  get:
   *    summary: get user chats
   *    tags: [Chat]
   *    description: api for get user chats
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      201:
   *        description: success
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getUserChats)


routes.route("/chat/:userId")
  /**
   * @swagger
   * /api/v1/chat/{userId}:
   *  get:
   *    summary: get user chat
   *    tags: [Chat]
   *    description: api for get user chat
   *    parameters:
   *      - in: path
   *        name: userId
   *        description: user id
   *        schema:
   *          type: string
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      201:
   *        description: success
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getChat)


const chatRoutes = routes
export default chatRoutes
