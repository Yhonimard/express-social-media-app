import { Router } from "express";
import UserController from "../controller/user.controller";
import jwtVerify from "../middleware/jwt-verify";
import db from "../config/db";

const routes = Router()
const userController = UserController()
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: The user api
 */


routes.route("/user/:userId/detail")
  /**
     * @swagger
     * /api/v1/user/{userId/detail}:
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
  .get(userController.getUserById)

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
     *        description: user not found
     *      500:
     *        description: something went wrong
     */
  .get(jwtVerify, userController.getUserCurrent)



const userRoutes = routes
export default userRoutes