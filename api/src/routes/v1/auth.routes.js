import { celebrate } from "celebrate";
import { Router } from "express";
import AuthController from "../../api/auth/auth.controller";
import AuthValidation from "../../api/auth/auth.validation";
import upload from "../../middlewares/upload";
import { User } from "../../models";
import AuthService from "../../services/auth/auth.service";


const routes = Router()
const service = AuthService({
  userRepo: User
})
const controller = AuthController(service)
const validation = AuthValidation()

/**
 * @swagger
 *  tags:
 *    name: Auth 
 *    description: the Auth Api
 */

routes.route("/auth/register")
  /**
   * @swagger
   * /api/v1/auth/register:
   *  post:
   *    summary: register
   *    tags: [Auth]
   *    description: register user
   *    requestBody:
   *      description: content for register user
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *              image-photo-profile:
   *                type: file
   *    responses:
   *      201:
   *        description: success register user
   *      409:
   *        description: username already exists
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .post(upload.single("image-photo-profile"), celebrate(validation.register), controller.register)

routes.route("/auth/login")
  /**
    * @swagger
    * /api/v1/auth/login:
    *  post:
    *    summary: login 
    *    tags: [Auth]
    *    description: login user
    *    requestBody:
    *      description: api for login user
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            type: object
    *            properties:
    *              username:
    *                type: string
    *              password:
    *                type: string
    *            example:
    *              username: yhoni
    *              password: yhoni  
    *    responses:
    *      201:
    *        description: success login user
    *      404:
    *        description: username not found
    *      400:
    *        description: validation error
    *      401:
    *        description: Unauthorized
    *      403:
    *        description: authentication failed
    *      500:
    *        description: something went wrong
    */
  .post(controller.login)

const authRoutes = routes
export default authRoutes
