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



const commentRoutes = routes
export default commentRoutes