import { Router } from "express";
import CommentController from "../controller/comment.controller";
import jwtVerify from "../middleware/jwt-verify";

const routes = Router()
const controller = CommentController()

routes.route("/post/:postId/comment")
  /**
      * @swagger
      * /api/v1/post/{postId}/comment:
      *  post:
      *    summary: create post comment 
      *    tags: [Comment]
      *    description: api for create post comment
      *    security:
      *     - jwt-auth: []
      *    parameters:
      *     - in: path
      *       name: postId
      *       description: for find the post
      *       required: true
      *       schema:
      *         type: string
      *    requestBody:
      *      description: for create post comment
      *      required: true
      *      content:
      *        application/json:
      *          schema:
      *            type: object
      *            properties:
      *              title:
      *                type: string
      *            example:
      *              title: wow great
      *    responses:
      *      201:
      *        description: success create comment
      *      404:
      *        description: user not found / post not found
      *      400:
      *        description: validation error
      *      401:
      *        description: Unauthorized
      *      500:
      *        description: something went wrong
      */
  .post(jwtVerify, controller.createComment)


routes.route("/post/:postId/comment")
  /**
      * @swagger
      * /api/v1/post/{postId}/comment:
      *  get:
      *    summary: get comment by post id
      *    tags: [Comment]
      *    description: api for get post comment by post id
      *    parameters:
      *     - in: path
      *       name: postId
      *       description: for find the post
      *       required: true
      *       schema:
      *         type: string
      *     - in: query 
      *       name: pageNo 
      *       description: for get the number of page
      *       required: true
      *       schema:
      *         type: number 
      *         example: 1
      *     - in: query 
      *       name: size 
      *       description: for get size of page
      *       required: true
      *       schema:
      *         type: number 
      *         example: 1
      *    responses:
      *      200:
      *        description: success get all comment by postid
      *      404:
      *        description: post not found / comment not found 
      *      500:
      *        description: something went wrong
      */
  .get(controller.getCommentByPostId)

routes.route("/post/:postId/comment/:commentId")
  /**
      * @swagger
      * /api/v1/post/{postId}/comment/{commentId}:
      *  patch:
      *    summary: update comment
      *    tags: [Comment]
      *    description: api for update comment 
      *    parameters:
      *     - in: path
      *       name: postId
      *       description: for find the post
      *       required: true
      *       schema:
      *         type: string
      *     - in: path
      *       name: commentId
      *       description: for find the comment
      *       required: true
      *       schema:
      *         type: string
      *    security:
      *     - jwt-auth: [] 
      *    requestBody:
      *     description: data for update comment
      *     required: true
      *     content:
      *       application/json:
      *         schema:
      *           type: object
      *           properties:
      *             title:
      *               type: string
      *           example:  
      *             title: updated comment  
      *    responses:
      *      200:
      *        description: success update comment
      *      400:
      *        description: validation error / comment doesnt belong to post
      *      401:
      *        description: unauthorized
      *      403:
      *        description: you cant update this user comment
      *      404:
      *        description: post not found / comment not found 
      *      500:
      *        description: something went wrong
      */
  .patch(jwtVerify, controller.updateCommentByPostId)


routes.route("/post/:postId/comment/:commentId")
  /**
      * @swagger
      * /api/v1/post/{postId}/comment/{commentId}:
      *  delete:
      *    summary: delete comment
      *    tags: [Comment]
      *    description: api for delete comment 
      *    parameters:
      *     - in: path
      *       name: postId
      *       description: for find the post
      *       required: true
      *       schema:
      *         type: string
      *     - in: path
      *       name: commentId
      *       description: for find the comment
      *       required: true
      *       schema:
      *         type: string
      *    security:
      *     - jwt-auth: [] 
      *    responses:
      *      200:
      *        description: success get all comment by postid
      *      400:
      *        description: validation error / comment doesnt belong to post
      *      401:
      *        description: unauthorized
      *      403:
      *        description: you cant delete this user comment
      *      404:
      *        description: post not found / comment not found 
      *      500:
      *        description: something went wrong
      */
  .delete(jwtVerify, controller.deleteCommentByPostId)


routes.route("/user/comment")
  /**
      * @swagger
      * /api/v1/user/comment:
      *  get:
      *    summary: get comment by post id
      *    tags: [Comment]
      *    description: api for get comment has commented user in post
      *    security:
      *     - jwt-auth: []
      *    parameters:
      *     - in: query 
      *       name: pageNo 
      *       description: for get the number of page
      *       required: true
      *       schema:
      *         type: number 
      *         example: 1
      *     - in: query 
      *       name: size 
      *       description: for get size of page
      *       required: true
      *       schema:
      *         type: number 
      *         example: 1
      *    responses:
      *      200:
      *        description: success get comment has commented user in post
      *      404:
      *        description: comment not found
      *      401:
      *        description: Unauthorized
      *      500:
      *        description: something went wrong
      */
  .get(jwtVerify, controller.getCommentHasCommentedCurrentUser)


routes.route('/post/comment/like')
  /**
    * @swagger
    * /api/v1/post/comment/like:
    *  post:
    *    summary: like comment
    *    tags: [Comment]
    *    description: api for like comment
    *    security:
    *     - jwt-auth: [] 
    *    requestBody:
    *     description: data for like comment
    *     required: true
    *     content:
    *       application/json:
    *         schema:
    *           type: object
    *           properties:
    *             commentId:
    *               type: string
    *    responses:
    *      200:
    *        description: success like comment
    *      400:
    *        description: validation error 
    *      401:
    *        description: unauthorized
    *      404:
    *        description: post not found 
    *      500:
    *        description: something went wrong
    */
  .post(jwtVerify, controller.likeCommentByCurruser)

routes.route('/post/comment/unlike')
  /**
     * @swagger
     * /api/v1/post/comment/unlike:
     *  delete:
     *    summary: unlike comment
     *    tags: [Comment]
     *    description: api for unlike comment
     *    security:
     *     - jwt-auth: [] 
     *    requestBody:
     *     description: data for unlike comment
     *     required: true
     *     content:
     *       application/json:
     *         schema:
     *           type: object
     *           properties:
     *             commentId:
     *               type: string
     *    responses:
     *      200:
     *        description: success unlike comment
     *      400:
     *        description: validation error 
     *      401:
     *        description: unauthorized
     *      404:
     *        description: post not found 
     *      500:
     *        description: something went wrong
     */
  .delete(jwtVerify, controller.unlikeCommentByCurrentUser)

routes.route("/post/comment/:cid/like")
  /**
     * @swagger
     * /api/v1/post/comment/{cid}/like:
     *  get:
     *    summary: get current user has like comment
     *    tags: [Comment]
     *    description: api for get current user has like comment
     *    security:
     *     - jwt-auth: [] 
     *    parameters:
     *      - in: path
     *        name: cid
     *        description: comment id
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: success unlike comment
     *      400:
     *        description: validation error 
     *      401:
     *        description: unauthorized
     *      404:
     *        description: post not found 
     *      500:
     *        description: something went wrong
     */
  .get(jwtVerify, controller.getCurrUserHasLikeComment)

const commentRoutes = routes
export default commentRoutes