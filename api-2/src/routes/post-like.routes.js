import { Router } from "express";
import PostLikeController from "../controller/post-like.controller";
import jwtVerify from "../middleware/jwt-verify";
import postLikeValidation from "../validation/post-like.validation";
import { celebrate } from "celebrate";

const routes = Router();
const controller = PostLikeController();
const validation = postLikeValidation
/**
 * @swagger
 *  tags:
 *    name: Post Like
 *    description: The Post api
 */

routes
  .route("/post/:pid/like")
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
  .post(jwtVerify, celebrate(validation.likePost), controller.likePost);

routes
  .route("/post/:pid/like")
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
  .delete(jwtVerify, celebrate(validation.unlikePost), controller.unlikePost);

routes
  .route("/post/:pid/like/user")
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
  .get(jwtVerify, celebrate(validation.getUserHasLikeByCurrentUser), controller.getUserHasLikeByCurrentUser);

const postLikeRoutes = routes;
export default postLikeRoutes;
