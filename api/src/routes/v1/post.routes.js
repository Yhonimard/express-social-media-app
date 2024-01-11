import { celebrate } from "celebrate"
import { Router } from "express"
import PostController from "../../api/post/post.controller"
import PostValidation from "../../api/post/post.validation"
import {
  API_POST,
  API_POST_DETAIL,
  API_POST_HAS_LIKE,
  API_POST_ID,
  API_POST_LIKE,
  API_POST_SEARCH,
  API_POST_UNLIKE,
  API_POST_USER,
  API_POST_USER_ID,
  API_POST_USER_LIKE,
  API_POST_USER_TOTAL,
  API_POST_USER_TOTAL_ID
} from "../../fixtures/api"
import jwtVerify from "../../middlewares/jwt-verify"
import upload from "../../middlewares/upload"
import {
  Post,
  User,
  UserLikePost,
  sequelize
} from "../../models"
import PostService from "../../services/post/post.service"

const routes = Router()
const service = PostService({
  postRepo: Post,
  sequelize: sequelize,
  userLikePostRepo: UserLikePost,
  userRepo: User
})
const controller = PostController(service)
const validation = PostValidation()

/**
 * @swagger
 *  tags:
 *    name: Post
 *    description: the post api
 */

routes.route(API_POST)
  /**
   * @swagger
   * /api/v1/post:
   *  get:
   *    summary: get posts
   *    tags: [Post]
   *    description: api for get posts
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
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.getPosts), controller.getPosts)

routes.route(API_POST)
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
   *      required: true,
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
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      500:
   *        description: something went wrong
   */
  .post(jwtVerify, upload.single("image/post"), celebrate(validation.createPost), controller.createPost)

routes.route(API_POST_ID)
  /**
   * @swagger
   * /api/v1/post/{id}:
   *  delete:
   *    summary: delete post
   *    tags: [Post]
   *    description: api for delete post
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
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
  .delete(jwtVerify, celebrate(validation.deletePost), controller.deletePost)

routes.route(API_POST_ID)
  /**
    * @swagger
    * /api/v1/post/{id}:
    *  patch:
    *    summary: update post
    *    tags: [Post]
    *    description: api for update post
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: post id
    *        schema:
    *          type: number
    *          example: 1
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            type: object
    *            properties:
    *              title:
    *                type: string
    *              content:
    *                type: string
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
  .patch(celebrate(validation.updatePost), jwtVerify, controller.updatePost)

routes.route(API_POST_DETAIL)
  /**
    * @swagger
    * /api/v1/post/{id}/detail:
    *  get:
    *    summary: get post detail
    *    tags: [Post]
    *    description: api for get post detail
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
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
  .get(celebrate(validation.getPostDetail), controller.getPostDetail)

routes.route(API_POST_HAS_LIKE)
  /**
    * @swagger
    * /api/v1/post/{id}/haslike:
    *  get:
    *    summary: get post detail
    *    tags: [Post]
    *    description: api for get post detail
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
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
  .get(celebrate(validation.getUserHasLikePost), jwtVerify, controller.getUserHasLikePost)

routes.route(API_POST_LIKE)
  /**
    * @swagger
    * /api/v1/post/{id}/like:
    *  post:
    *    summary: like post
    *    tags: [Post]
    *    description: api for like post
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: post id
    *        schema:
    *          type: number
    *          example: 1
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error
    *      404:
    *        description: post not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .post(celebrate(validation.likePost), jwtVerify, controller.likePost)

routes.route(API_POST_UNLIKE)
  /**
    * @swagger
    * /api/v1/post/{id}/unlike:
    *  delete:
    *    summary: unlike post
    *    tags: [Post]
    *    description: api for unlike post
    *    security:
    *      - jwt-auth: []
    *    parameters:
    *      - in: path
    *        name: id
    *        description: post id
    *        schema:
    *          type: number
    *          example: 1
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error
    *      404:
    *        description: post not found
    *      401:
    *        description: unauthorized
    *      500:
    *        description: something went wrong
    */
  .delete(celebrate(validation.unlikePost), jwtVerify, controller.unlikePost)

routes.route(API_POST_USER)
  /**
   * @swagger
   * /api/v1/user/post:
   *  get:
   *    summary: get current user posts
   *    tags: [Post]
   *    description: api for get current user posts
   *    security:
   *      - jwt-auth: []
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
   *    responses:
   *      200:
   *        description: success
   *      401:
   *        description: unauthorized
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.getCurrentUserPosts), jwtVerify, controller.getCurrentUserPosts)

routes.route(API_POST_USER_ID)
  /**
   * @swagger
   * /api/v1/user/{user_id}/post:
   *  get:
   *    summary: get posts by user id
   *    tags: [Post]
   *    description: api for get posts by user id
   *    security:
   *      - jwt-auth: []
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
   *        name: user_id
   *        description: user id
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
  .get(celebrate(validation.getPostsByUserId), controller.getPostsByUserId)


routes.route(API_POST_USER_LIKE)
  /**
   * @swagger
   * /api/v1/user/post/like:
   *  get:
   *    summary: get posts liked user
   *    tags: [Post]
   *    description: api for get posts liked user
   *    security:
   *      - jwt-auth: []
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
   *    responses:
   *      200:
   *        description: success
   *      401:
   *        description: unauthorized
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getPostLikedUser)

routes.route(API_POST_SEARCH)
  /**
   * @swagger
   * /api/v1/post/search:
   *  get:
   *    summary: search posts
   *    tags: [Post]
   *    description: api for search posts
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
   *      - in: query
   *        name: search
   *        description: search post
   *        schema:
   *          type: string
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.searchPost), controller.searchPost)

routes.route(API_POST_USER_TOTAL)
  /**
    * @swagger
    * /api/v1/user/post/total:
    *  get:
    *    summary: total current user post
    *    tags: [Post]
    *    description: api for total current user post
    *    security:
    *     - jwt-auth: []
    *    responses:
    *      200:
    *        description: success
    *      400:
    *        description: validation error
    *      500:
    *        description: something went wrong
    */
  .get(jwtVerify, controller.getCurrentUserTotalPosts)


routes.route(API_POST_USER_TOTAL_ID)
  /**
    * @swagger
    * /api/v1/user/{id}/post/total:
    *  get:
    *    summary: total user post
    *    tags: [Post]
    *    description: api for total user post
    *    security:
    *     - jwt-auth: []
    *    parameters:
    *     - in: path
    *       name: id
    *       description: user id
    *       schema:
    *         type: number
    *         example: 2
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
  .get(jwtVerify, controller.getUserTotalPost)

const postRoutes = routes

export default postRoutes
