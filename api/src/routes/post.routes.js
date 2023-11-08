import { Router } from "express";
import PostController from "../controller/post.controller";
import upload from "../middleware/upload";
import jwtVerify from "../middleware/jwt-verify";

const routes = Router();
const controller = PostController();
/**
 * @swagger
 *  tags:
 *    name: Post
 *    description: The Post api
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      jwt-auth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */

routes
  .route("/post")
  /**
   * @swagger
   * /api/v1/post:
   *  post:
   *    summary: create post
   *    tags: [Post]
   *    description: api for create post
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              content:
   *                type: string
   *              image:
   *                type: file
   *    responses:
   *      201:
   *        description: success create post
   *      400:
   *        description: validation error
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: something went wrong
   */
  .post(jwtVerify, upload.image.single("image"), controller.createPost);

routes
  .route("/post")
  /**
   * @swagger
   * /api/v1/post:
   *  get:
   *    summary: get all post
   *    tags: [Post]
   *    description: api for get post
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
   *    responses:
   *      200:
   *        description: success get post
   *      400:
   *        description: validation query error
   *      500:
   *        description: something went wrong
   */
  .get(controller.getAllPost);

routes
  .route("/post/:postId")
  /**
   * @swagger
   * /api/v1/post/{postId}:
   *  patch:
   *    summary: update post
   *    tags: [Post]
   *    description: api for update post
   *    parameters:
   *      - in: path
   *        name: postId
   *        description: for get the post
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *       content:
   *         application/json:
   *           schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              content:
   *                type: string
   *            example:
   *              title: update title
   *              content: update content
   *    responses:
   *      200:
   *        description: success update post
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found / post not found
   *      403:
   *        description: cannot update this user post
   *      500:
   *        description: something went wrong
   */
  .patch(jwtVerify, controller.updatePost);

routes
  .route("/post/:postId")
  /**
   * @swagger
   * /api/v1/post/{postId}:
   *  delete:
   *    summary: delete post
   *    tags: [Post]
   *    description: api for delete post
   *    parameters:
   *      - in: path
   *        name: postId
   *        description: for get the post
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success delete post
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found / post not found
   *      403:
   *        description: cannot delete this user post
   *      500:
   *        description: something went wrong
   */
  .delete(jwtVerify, controller.deletePost);

routes
  .route("/post/:postId/detail")
  /**
   * @swagger
   * /api/v1/post/{postId}/detail:
   *  get:
   *    summary: get post by id
   *    tags: [Post]
   *    description: api for get single post
   *    parameters:
   *      - in: path
   *        name: postId
   *        description: for get the post
   *    responses:
   *      200:
   *        description: success get post
   *      404:
   *        description: post not found
   *      500:
   *        description: something went wrong
   */
  .get(controller.getPostById);

routes
  .route(`/user/post`)
  /**
   * @swagger
   * /api/v1/user/post:
   *  get:
   *    summary: get all post by current user
   *    parameters:
   *     - in: query
   *       name: pageNo
   *       description: for get the number of page
   *       schema:
   *         type: number
   *         example: 1
   *     - in: query
   *       name: size
   *       description: for get the size of page
   *       schema:
   *         type: number
   *         example: 4
   *    security:
   *     - jwt-auth: []
   *    tags: [Post]
   *    description: api for get post post user id
   *    responses:
   *      200:
   *        description: success get all post
   *      404:
   *        description: post not found
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getAllPostByCurrentUser);

routes
  .route(`/user/post/:pid`)
  /**
   * @swagger
   * /api/v1/user/post/{pid}:
   *  patch:
   *    summary: update post by author
   *    tags: [Post]
   *    description: api for update post by author
   *    parameters:
   *      - in: path
   *        name: pid
   *        description: for get the post
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *       content:
   *         application/json:
   *           schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              content:
   *                type: string
   *            example:
   *              title: update title
   *              content: update content
   *    responses:
   *      200:
   *        description: success update post by author
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found / post not found
   *      403:
   *        description: cannot update this user post
   *      500:
   *        description: something went wrong
   */
  .patch(jwtVerify, controller.updatePostByUser);

routes
  .route("/user/post/:pid")
  /**
   * @swagger
   * /api/v1/user/post/{pid}:
   *  delete:
   *    summary: delete post by author
   *    tags: [Post]
   *    description: api for delete post by author
   *    parameters:
   *      - in: path
   *        name: pid
   *        description: for get the post
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success delete post by author
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found / post not found
   *      403:
   *        description: cant delete this user post
   *      500:
   *        description: something went wrong
   */
  .delete(jwtVerify, controller.deletePostByUser);

routes
  .route("/user/post")
  /**
   * @swagger
   * /api/v1/user/post:
   *  post:
   *    summary: create post by user
   *    tags: [Post]
   *    description: api for create post by user
   *    security:
   *      - jwt-auth: []
   *    requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              content:
   *                type: string
   *              image:
   *                type: file
   *    responses:
   *      201:
   *        description: success create post by user
   *      400:
   *        description: validation error
   *      401:
   *        description: Unauthorized
   *      500:
   *        description: something went wrong
   */
  .post(
    jwtVerify,
    upload.image.single("image"),
    controller.createPostByUser
  );

routes
  .route("/user/post/like")
  /**
   * @swagger
   * /api/v1/user/post/like:
   *  get:
   *    summary: get all post has like current user
   *    tags: [Post]
   *    description: api for get post has like current user
   *    security:
   *      - jwt-auth: []
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
   *    responses:
   *      200:
   *        description: success get post has like user
   *      401:
   *        description: unauthorized
   *      400:
   *        description: validation error
   *      404:
   *        description: post not found
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getAllPostHasLikedCurrentUser);


routes.route(`/user/:uid/post`)
  /**
     * @swagger
     * /api/v1/user/{uid}/post:
     *  get:
     *    summary: get post by user id
     *    tags: [Post]
     *    description: api for get post by user id
     *    parameters:
     *      - in: path
     *        name: uid
     *        description: user id
     *        schema:
     *          type: string
     *      - in: query
     *        name: pageNo
     *        description: for get the number of page
     *        schema:
     *          type: string
     *          example: 1
     *      - in: query
     *        name: size
     *        description: for get the size of page
     *        schema:
     *          type: string
     *          example: 4
     *    responses:
     *      200:
     *        description: success 
     *      400:
     *        description: validation query error
     *      404:
     *        description: user not found
     *      500:
     *        description: something went wrong
     */
  .get(controller.getPostByAuthorId)


routes.route("/post/search")
  /**
      * @swagger
      * /api/v1/post/search:
      *  get:
      *    summary: search post
      *    tags: [Post]
      *    description: api for search post
      *    parameters:
      *      - in: query
      *        name: search
      *        description: search post by title or content
      *        schema:
      *          type: string
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
      *    responses:
      *      200:
      *        description: success 
      *      400:
      *        description: validation query error
      *      404:
      *        description: user not found
      *      500:
      *        description: something went wrong
      */
  .get(controller.searchPost)

const postRoutes = routes;
export default postRoutes;
