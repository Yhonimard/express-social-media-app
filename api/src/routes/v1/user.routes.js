import { celebrate } from "celebrate";
import { Router } from "express";
import UserController from "../../api/user/user.controller";
import UserValidation from "../../api/user/user.validation";
import { API_USER, API_USER_DETAIL_ID, API_USER_PROFILE, API_USER_PROFILE_ID, API_USER_SEARCH } from "../../fixtures/api";
import jwtVerify from "../../middlewares/jwt-verify";
import { User, UserProfile, sequelize } from "../../models";
import UserService from "../../services/user/user.service";

const routes = Router()
const service = UserService({
  userRepo: User,
  userProfileRepo: UserProfile,
  sequelize
})

const controller = UserController(service)
const validation = UserValidation()

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: the post api
 */

routes.route(API_USER)
  /**
   * @swagger
   * /api/v1/user:
   *  get:
   *    summary: get current user detail
   *    tags: [User]
   *    description: api for get current user detail
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getCurrentUser)

routes.route(API_USER_PROFILE)
  /**
   * @swagger
   * /api/v1/user/profile:
   *  get:
   *    summary: get current user profile
   *    tags: [User]
   *    description: api for get current user profile
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getCurrentUserProfile)

routes.route(API_USER_DETAIL_ID)
  /**
   * @swagger
   * /api/v1/user/{id}:
   *  get:
   *    summary: get user by id
   *    tags: [User]
   *    description: api for get current user by id
   *    parameters:
   *      - in: path
   *        description: user id
   *        name: id
   *        schema:
   *          required: true
   *          type: number
   *          example: 1
   *    responses:
   *      200:
   *        description: success
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.getUserById), controller.getUserById)

routes.route(API_USER_PROFILE_ID)
  /**
   * @swagger
   * /api/v1/user/{id}/profile:
   *  get:
   *    summary: get profile by user id
   *    tags: [User]
   *    description: api for get profile by user id
   *    parameters:
   *      - in: path
   *        description: user id
   *        name: id
   *        schema:
   *          required: true
   *          type: number
   *          example: 1
   *    responses:
   *      200:
   *        description: success
   *      404:
   *        description: user not found
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.getProfileUserById), controller.getProfileByUserId)

routes.route(API_USER_PROFILE)
  /**
   * @swagger
   * /api/v1/user/profile:
   *  patch:
   *    summary: update profile
   *    tags: [User]
   *    description: api for update profile
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              phone:
   *                type: string
   *              bio:
   *                type: string
   *              birthday:
   *                type: string
   *                format: date
   *    responses:
   *      200:
   *        description: success
   *      404:
   *        description: user not found
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .patch(jwtVerify, celebrate(validation.updateProfile), controller.updateProfile)

routes.route(API_USER_SEARCH)
  /**
   * @swagger
   * /api/v1/user/search:
   *  get:
   *    summary: search user
   *    tags: [User]
   *    description: api for search user
   *    security:
   *      - jwt-auth: []
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
   *      - in: query
   *        name: search
   *        description: search user
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, celebrate(validation.searchUser), controller.searchUser)

const userRoutes = routes
export default userRoutes

