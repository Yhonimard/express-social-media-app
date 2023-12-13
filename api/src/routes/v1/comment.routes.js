import { celebrate } from "celebrate";
import { Router } from "express";
import CommentController from "../../api/comment/comment.controller";
import CommentValidation from "../../api/comment/comment.validation";
import {
  API_COMMENT_POST,
  API_COMMENT_POST_ID,
  API_COMMENT_POST_LIKE_ADD,
  API_COMMENT_POST_LIKE_CHECK,
  API_COMMENT_POST_LIKE_REMOVE,
  API_COMMENT_REPLY,
  API_COMMENT_USER
} from "../../fixtures/api";
import jwtVerify from "../../middlewares/jwt-verify";
import { Comment, Post, UserLikeComment, sequelize } from "../../models";
import CommentService from "../../services/comment/comment.service";

const routes = Router()

const service = CommentService({
  commentRepo: Comment,
  sequelize: sequelize,
  userLikeCommentRepo: UserLikeComment,
  postRepo: Post
})

const controller = CommentController(service)
const validation = CommentValidation()

/**
 * @swagger
 *  tags:
 *    name: Comment
 *    description: Comment Api
 */

routes.route(API_COMMENT_POST)
  /**
    * @swagger
    * /api/v1/post/{post_id}/comment:
    *  get:
    *    summary: get comments
    *    tags: [Comment]
    *    description: api for get comments
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
    *      - in: path
    *        name: post_id
    *        description: post id
    *        schema:
    *          type: number
    *          example: 1
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error
    *      500:
    *        description: something went wrong
    */
  .get(celebrate(validation.getComments), controller.getComments)


routes.route(API_COMMENT_POST)
  /**
     * @swagger
     * /api/v1/post/{post_id}/comment:
     *  post:
     *    summary: create comments
     *    tags: [Comment]
     *    description: api for create comments
     *    security:
     *      - jwt-auth: []
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              title:
     *                type: string
     *    parameters:
     *      - in: path
     *        name: post_id
     *        description: post id
     *        schema:
     *          type: number
     *          example: 1
     *    responses:
     *      200:
     *        description: success
     *      400:
     *        description: validation error
     *      401:
     *        description: unauthorized
     *      500:
     *        description: something went wrong
     */
  .post(celebrate(validation.createComment), jwtVerify, controller.createComment)

routes.route(API_COMMENT_POST_ID)
  /**
    * @swagger
    * /api/v1/post/{post_id}/comment/{id}:
    *  patch:
    *    summary: update comments
    *    tags: [Comment]
    *    description: api for update comments
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: comment id
    *        schema:
    *          type: number
    *      - in: path
    *        name: post_id
    *        description: post id
    *        schema:
    *          type: number
    *    requestBody:
    *     content:
    *       application/json:
    *         schema:
    *           type: object
    *           properties:
    *             title:
    *               type: string
    *    responses:
    *      200:
    *        description: success
    *      404:
    *        description: post not found
    *      401:
    *        description: unauthorized
    *      403:
    *        description: forbidden
    *      400:
    *        description: validation error
    *      500:
    *        description: something went wrong
    */
  .patch(celebrate(validation.updateComment), jwtVerify, controller.updateComment)


routes.route(API_COMMENT_POST_ID)
  /**
    * @swagger
    * /api/v1/post/{post_id}/comment/{id}:
    *  delete:
    *    summary: delete comment
    *    tags: [Comment]
    *    description: api for delete comment
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: comment id
    *        schema:
    *          type: number
    *      - in: path
    *        name: post_id
    *        description: post id
    *        schema:
    *          type: number
    *    responses:
    *      200:
    *        description: success
    *      404:
    *        description: post not found
    *      401:
    *        description: unauthorized
    *      403:
    *        description: forbidden
    *      400:
    *        description: validation error | some error
    *      500:
    *        description: something went wrong
    */
  .delete(celebrate(validation.deleteComment), jwtVerify, controller.deleteComment)

routes.route(API_COMMENT_POST_LIKE_CHECK)
  /**
    * @swagger
    * /api/v1/post/comment/{id}/haslike:
    *  get:
    *    summary: get user has like comment
    *    tags: [Comment]
    *    description: api for get user has like comment
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: comment id
    *        schema:
    *          type: number
    *    responses:
    *      200:
    *        description: success
    *      404:
    *        description: comment not found
    *      401:
    *        description: unauthorized
    *      400:
    *        description: validation error | some error
    *      500:
    *        description: something went wrong
    */
  .get(celebrate(validation.getUserHasLikeComment), jwtVerify, controller.getUserHasLikeComment)

routes.route(API_COMMENT_POST_LIKE_ADD)
  /**
    * @swagger
    * /api/v1/post/comment/{id}/like:
    *  post:
    *    summary: like comment
    *    tags: [Comment]
    *    description: api for  like comment
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: comment id
    *        schema:
    *          type: number
    *    responses:
    *      200:
    *        description: success
    *      404:
    *        description: comment not found
    *      401:
    *        description: unauthorized
    *      400:
    *        description: validation error | some error
    *      500:
    *        description: something went wrong
    */
  .post(celebrate(validation.likeComment), jwtVerify, controller.likeComment)


routes.route(API_COMMENT_POST_LIKE_REMOVE)
  /**
     * @swagger
     * /api/v1/post/comment/{id}/unlike:
     *  delete:
     *    summary: unlike comment
     *    tags: [Comment]
     *    description: api for  unlike comment
     *    security:
     *      - jwt-auth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        description: comment id
     *        schema:
     *          type: number
     *    responses:
     *      200:
     *        description: success
     *      404:
     *        description: comment not found
     *      401:
     *        description: unauthorized
     *      400:
     *        description: validation error | some error
     *      500:
     *        description: something went wrong
     */
  .delete(celebrate(validation.unlikeComment), jwtVerify, controller.unlikeComment)


routes.route(API_COMMENT_REPLY)
  /**
    * @swagger
    * /api/v1/post/comment/{parent_id}/reply:
    *  get:
    *    summary: get comment replies
    *    tags: [Comment]
    *    description: api for get comment replies
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
    *      - in: path
    *        name: parent_id
    *        description: parent comment id
    *        schema:
    *          type: number
    *          example: 1
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error
    *      500:
    *        description: something went wrong
    */
  .get(celebrate(validation.getRepliesComment), controller.getRepliesComment)


routes.route(API_COMMENT_REPLY)
  /**
    * @swagger
    * /api/v1/post/comment/{parent_id}/reply:
    *  post:
    *    summary: reply comment
    *    tags: [Comment]
    *    description: api for reply comment
    *    security:
    *     - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: parent_id
    *        description: parent comment id
    *        schema:
    *          type: number
    *          example: 1
    *    requestBody:
    *     content:
    *       application/json:
    *         schema:
    *           type: object
    *           properties:
    *             title:
    *               type: string
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error | some error
    *      401:
    *        description: unauthorized
    *      404:
    *        description: comment not found | post not found
    *      500:
    *        description: something went wrong
    */
  .post(celebrate(validation.replyComment), jwtVerify, controller.replyComment)


routes.route(API_COMMENT_USER)
  /**
    * @swagger
    * /api/v1/user/post/comment:
    *  get:
    *    summary: get user comments
    *    tags: [Comment]
    *    description: api for get user comments
    *    security:
    *     - jwt-auth: []
    *    parameters:
    *      - in: query
    *        name: pageNo
    *        description: page number
    *        schema:
    *          type: number
    *          example: 1
    *      - in: query
    *        name: size
    *        description: the size of page
    *        schema:
    *          type: number
    *          example: 4
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error | some error
    *      401:
    *        description: unauthorized
    *      404:
    *        description: comment not found | post not found
    *      500:
    *        description: something went wrong
    */
  .get(jwtVerify, controller.getUserComment)

const commentRoutes = routes
export default commentRoutes