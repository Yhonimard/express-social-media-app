import { Router } from "express";
import AuthController from "../controller/auth.controller";
import upload from "../middleware/upload";

const routes = Router()
const authController = AuthController()
/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: The Auth api
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
   *              photoProfile:
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
  .post(upload.image.single("photoProfile"), authController.registerUser)

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
  .post(authController.loginUser)

const authRoutes = routes
export default authRoutes