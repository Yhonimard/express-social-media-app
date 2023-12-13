import { Router } from "express";
import upload from "../middleware/upload";
import jwtVerify from "../middleware/jwt-verify";
import { Joi, Segments, celebrate } from "celebrate";
import authValidation from "../validation/auth.validation";
import AuthController from "../controller/auth/auth.controller";

const routes = Router()
const controller = AuthController()

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
  .post(upload.image.single("photoProfile"), celebrate(authValidation.registerUser), controller.registerUser)

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
  .post(celebrate(authValidation.loginUser), controller.loginUser)

routes.route("/auth/verify-user").get(jwtVerify, controller.verifyToken)

const authRoutes = routes
export default authRoutes
