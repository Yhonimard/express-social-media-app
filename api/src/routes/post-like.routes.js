import { Router } from "express";
import PostLikeController from "../controller/post-like.controller";
import jwtVerify from "../middleware/jwt-verify";

const routes = Router()
const postLikeController = PostLikeController()

/**
 * @swagger
 *  tags:
 *    name: Post Like
 *    description: The Post api
 */



routes.route("/post/:pid/like")
  /**
    * @swagger
    * /api/v1/post/{postId}/like:
    *  post:
    *    summary: like post
    *    tags: [Post Like]
    *    description: api for like 
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: postId
    *        description: for get the post
    *    responses:
    *      200:
    *        description: success like post 
    *      404:
    *        description: post not found / user not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .post(jwtVerify, postLikeController.likePost)

routes.route("/post/:pid/like")
  /**
    * @swagger
    * /api/v1/post/{postId}/like:
    *  delete:
    *    summary: unlike post
    *    tags: [Post Like]
    *    description: unlike post
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: postId
    *        description: for get the post
    *    responses:
    *      200:
    *        description: success unlike post / success unlike post
    *      404:
    *        description: post not found / user not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .delete(jwtVerify, postLikeController.unlikePost)


routes.route("/post/:pid/like/user")
  /**
    * @swagger
    * /api/v1/post/{postId}/like/user:
    *  get:
    *    summary: get current user has like
    *    tags: [Post Like]
    *    description: api for get current user has like or not
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: postId
    *        description: for get the post
    *    responses:
    *      200:
    *        description: success
    *      404:
    *        description: post not found / user not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .get(jwtVerify, postLikeController.getUserHasLikeByCurrentUser)

routes.route("/user/like")
  /**
    * @swagger
    * /api/v1/user/like:
    *  get:
    *    summary: get current user has like
    *    tags: [Post Like]
    *    description: api for get current user has like or not
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
    *      404:
    *        description: like not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .get(jwtVerify, postLikeController.getAllUserLikeByCurrentUser)

const postLikeRoutes = routes
export default postLikeRoutes

