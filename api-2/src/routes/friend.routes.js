import { Router } from "express";
import FriendController from "../controller/friend.controller";
import jwtVerify from "../middleware/jwt-verify";
import friendValidation from "../validation/friend.validation";
import { celebrate } from "celebrate";

const routes = Router()
const controller = FriendController()
const validation = friendValidation
/**
 * @swagger
 *  tags:
 *    name: Friend
 *    description: The user friend api
 */


routes.route("/friend/:receiverId/follow")
  /**
     * @swagger
     * /api/v1/friend/{receiverId}/follow:
     *  post:
     *    summary: follow user api
     *    tags: [Friend]
     *    description: api for add friend
     *    security:
     *      - jwt-auth: []
     *    parameters:
     *     - in: path
     *       name: receiverId
     *       description: user who will be follow
     *    responses:
     *      201:
     *        description: success follow user
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: user not found 
     *      400:
     *        description: error params validation / friendship already exists / you cant send friend request to yourself
     *      500:
     *        description: something went wrong
     */
  .post(jwtVerify, celebrate(validation.follow), controller.followFriend)


routes.route("/friend/:receiverId/unfollow")
  /**
     * @swagger
     * /api/v1/friend/{receiverId}/unfollow:
     *  delete:
     *    summary: unfriend user friend
     *    tags: [Friend]
     *    description: api for unfriend friend
     *    security:
     *      - jwt-auth: []
     *    parameters:
     *     - in: path
     *       name: receiverId
     *       description: user who you added to friend
     *    responses:
     *      200:
     *        description: success unfriend this user
     *      401:
     *        description: Unauthorized
     *      400:
     *        description: params validation error / you cant unfriend yourself
     *      403:
     *        description: youare not allowed to confirm this user friendship
     *      404:
     *        description: user not found / friendship not found
     *      500:
     *        description: something went wrong
     */
  .delete(jwtVerify, celebrate(validation.unfollow), controller.unfollowUser)

routes.route("/user/:receiverId/friend")
  /**
      * @swagger
      * /api/v1/user/{receiverId}/friend:
      *  get:
      *    summary: get user has follow
      *    tags: [Friend]
      *    description: api for get user has follow
      *    security:
      *      - jwt-auth: []
      *    parameters:
      *     - in: path
      *       name: receiverId
      *       description: user who you added to friend
      *    responses:
      *      200:
      *        description: success 
      *      401:
      *        description: Unauthorized
      *      400:
      *        description: params validation error / you cant unfriend yourself
      *      404:
      *        description: user not found / friendship not found
      *      500:
      *        description: something went wrong
      */
  .get(jwtVerify, celebrate(validation.getUserHasFollow), controller.getUserHasFollow)

routes.route("/user/friend/request")
  /**
       * @swagger
       * /api/v1/user/friend/request:
       *  get:
       *    summary: get user current user friend requst
       *    tags: [Friend]
       *    description: api for get current user friend request
       *    parameters:
       *      - in: query
       *        name: pageNo
       *        description: for get the number of page
       *        schema:
       *          type: number
       *          example: 1
       *      - in: query
       *        name: size
       *        description: for get the size of page
       *        schema:
       *          type: number
       *          example: 4
       *    security:
       *      - jwt-auth: []
       *    responses:
       *      200:
       *        description: success 
       *      401:
       *        description: Unauthorized
       *      500:
       *        description: something went wrong
       */
  .get(jwtVerify, celebrate(validation.getCurrentUserFriendRequest), controller.getCurrentUserFriendRequest)

routes.route("/user/friend/following")
  /**
       * @swagger
       * /api/v1/user/friend/following:
       *  get:
       *    tags: [Friend]
       *    summary: get current user following
       *    description: api get current user following 
       *    parameters:
       *      - in: query
       *        name: pageNo
       *        description: for get the number of page
       *        schema:
       *          type: number
       *          example: 1
       *      - in: query
       *        name: size
       *        description: for get the size of page
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
       *        description: Unauthorized
       *      500:
       *        description: something went wrong
       */
  .get(jwtVerify, celebrate(validation.getCurrentUserFollowing), controller.getCurrentUserFollowing)

routes.route("/friend/:senderId/confirm")
  /**
     * @swagger
     * /api/v1/friend/{senderId}/confirm:
     *  patch:
     *    summary: confirm user friend
     *    tags: [Friend]
     *    description: api for confirm friend
     *    security:
     *      - jwt-auth: []
     *    parameters:
     *     - in: path
     *       name: senderId
     *       description: user who send request friend
     *    responses:
     *      200:
     *        description: success confirm this user
     *      401:
     *        description: Unauthorized
     *      400:
     *        description: params validation error / you have become friend with this user / 
     *      403:
     *        description: youare not allowed to confirm this user friendship
     *      404:
     *        description: user not found / friendship not found
     *      500:
     *        description: something went wrong
     */
  .patch(jwtVerify, celebrate(validation.confirmFriend), controller.confirmFriend)

routes.route("/friend/:senderId/unconfirm")
  /**
     * @swagger
     * /api/v1/friend/{senderId}/unconfirm:
     *  delete:
     *    summary: unconfirm user friend
     *    tags: [Friend] 
     *    description: api for unconfirm friend
     *    security:
     *      - jwt-auth: []
     *    parameters:
     *     - in: path
     *       name: senderId
     *       description: user who send request friend
     *    responses:
     *      200:
     *        description: success unconfirm this user
     *      401:
     *        description: Unauthorized
     *      400:
     *        description: params validation error  
     *      403:
     *        description: youare not allowed to confirm this user friendship
     *      404:
     *        description: user not found / friendship not found
     *      500:
     *        description: something went wrong
     */
  .delete(jwtVerify, celebrate(validation.unconfirmFriend), controller.unconfirmFriend)


routes.route("/user/friend/followers")
  /**
       * @swagger
       * /api/v1/user/friend/followers:
       *  get:
       *    tags: [Friend]
       *    summary: get current user followers
       *    description: api get current user followers
       *    parameters:
       *      - in: query
       *        name: pageNo
       *        description: for get the number of page
       *        schema:
       *          type: number
       *          example: 1
       *      - in: query
       *        name: size
       *        description: for get the size of page
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
       *        description: Unauthorized
       *      500:
       *        description: something went wrong
       */
  .get(jwtVerify, celebrate(validation.getCurrentUserFollowers), controller.getCurrentUserFollowers)

routes.route("/user/friend/followers")
  /**
       * @swagger
       * /api/v1/user/friend/followers:
       *  delete:
       *    tags: [Friend]
       *    summary: delete followers
       *    description: api for delete followers
       *    requestBody:
       *      required: true
       *      content:
       *        application/json:
       *          schema:
       *            type: object
       *            properties:
       *              senderId:
       *                type: string
       *    security:
       *      - jwt-auth: []
       *    responses:
       *      200:
       *        description: success 
       *      400:
       *        description: validation error
       *      401:
       *        description: Unauthorized
       *      500:
       *        description: something went wrong
       */
  .delete(jwtVerify, celebrate(validation.deleteFollowers), controller.deleteFollowers)


const friendRoutes = routes
export default friendRoutes
