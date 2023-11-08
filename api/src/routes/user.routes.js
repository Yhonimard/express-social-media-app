import { Router } from "express";
import UserController from "../controller/user.controller";
import jwtVerify from "../middleware/jwt-verify";
import db from "../config/db";

const routes = Router()
const controller = UserController()
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: The user api
 */


routes.route("/user/:userId/detail")
  /**
     * @swagger
     * /api/v1/user/{userId}/detail:
     *  get:
     *    summary: get user detail
     *    tags: [User]
     *    description: api for get user detail
     *    parameters:
     *      - in: path
     *        name: userId
     *        description: user id
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: success get user by id
     *      400:
     *        description: validation query error
     *      404:
     *        description: user not found
     *      500:
     *        description: something went wrong
     */
  .get(controller.getUserById)

routes.route("/user/current")
  /**
     * @swagger
     * /api/v1/user/current:
     *  get:
     *    summary: get current user profile
     *    tags: [User]
     *    description: api for get current user profile
     *    security:
     *      - jwt-auth: []
     *    responses:
     *      200:
     *        description: success get user current
     *      404:
     *        description: user not found
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: something went wrong
     */
  .get(jwtVerify, controller.getUserCurrent)

routes.route("/user/profile")
  /**
   * @swagger
   * /api/v1/user/profile:
   *  get:
   *    summary: get user current user profile
   *    tags: [User]
   *    description: api for get current user   
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success update user profile
   *      404:
   *        description: user not found
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: something went wrong
  */
  .get(jwtVerify, controller.getUserProfile)

routes.route("/user/profile")
  /**
     * @swagger
     * /api/v1/user/profile:
     *  patch:
     *    summary: update user profile
     *    tags: [User]
     *    description: api for update user profile
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              bio:
     *                type: string
     *                example: i like a cat
     *              birthday:
     *                type: string
     *                format: date
     *                example: 2017-07-21T17:32:28Z
     *              phone:
     *                type: string
     *                example: 6285694555246
     *    security:
     *      - jwt-auth: []
     *    responses:
     *      200:
     *        description: success update user profile
     *      404:
     *        description: user not found
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: something went wrong
     */
  .patch(jwtVerify, controller.updateProfile)

routes.route("/user/:uid/profile")
  /**
     * @swagger
     * /api/v1/user/{uid}/profile:
     *  get:
     *    summary: get user profile by user id
     *    tags: [User]
     *    description: api for get user profile by user id
     *    parameters:
     *      - in: path
     *        name: uid
     *        description: user id
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: success 
     *      400:
     *        description: validation query error
     *      404:
     *        description: profile not found
     *      500:
     *        description: something went wrong
     */
  .get(controller.getUserProfileByUserId)


routes.route("/user/search")
  /**
     * @swagger
     * /api/v1/user/search:
     *  get:
     *    summary: search user
     *    tags: [User]
     *    description: api for search user
     *    parameters:
     *      - in: query
     *        name: search
     *        description: search user by username or name
     *        schema:
     *          type: string
     *      - in: query
     *        name: pageNo
     *        description: for get the page number
     *        schema:
     *          type: number
     *          example: 1
     *      - in: query
     *        name: size
     *        description: for get the size of page
     *        schema:
     *          type: number
     *          example: 4
     *    responses:
     *      200:
     *        description: success 
     *      400:
     *        description: validation query error
     *      404:
     *        description: user not found
     *      500:
     *        description: something went wrong
     */
  .get(controller.searchUserByUserId)

const userRoutes = routes
export default userRoutes