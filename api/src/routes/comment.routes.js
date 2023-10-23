import { Router } from "express";
import CommentController from "../controller/comment.controller";
import jwtVerify from "../middleware/jwt-verify";

const routes = Router()
const commentController = CommentController()

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
  .post(jwtVerify, commentController.createComment)


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
  .get(commentController.getCommentByPostId)

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
  .patch(jwtVerify, commentController.updateCommentByPostId)


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
  .delete(jwtVerify, commentController.deleteCommentByPostId)


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
  .get(jwtVerify, commentController.getCommentHasCommentedCurrentUser)


const commentRoutes = routes
export default commentRoutes