import { celebrate } from "celebrate";
import { Router } from "express";
import FriendController from "../../api/friend/friend.controller";
import FriendValidation from "../../api/friend/friend.validation";
import {
  API_FREIND_USER_TOTAL_ID,
  API_FRIEND_FOLLOWERS_REQUEST,
  API_FRIEND_ID,
  API_FRIEND_REQUEST_ID,
  API_FRIEND_USER_FOLLOWERS,
  API_FRIEND_USER_FOLLOWERS_ID,
  API_FRIEND_USER_FOLLOWING,
  API_FRIEND_USER_FOLLOWING_ID,
  API_FRIEND_USER_ID,
  API_FRIEND_USER_TOTAL
} from "../../fixtures/api";
import jwtVerify from "../../middlewares/jwt-verify";
import { User, UserFriend, sequelize } from "../../models";
import FriendService from "../../services/friend/friend.service";

const routes = Router()

const service = FriendService({
  userRepo: User,
  userFriendRepo: UserFriend,
  sequelize
})
const controller = FriendController(service)
const validation = FriendValidation()


/**
 * @swagger
 *  tags:
 *    name: Friend
 *    description: the friend api
 */


routes.route(API_FRIEND_ID)
  /**
   * @swagger
   * /api/v1/friend/{id}:
   *  post:
   *    summary: follow user
   *    tags: [Friend]
   *    description: api for follow user
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        description: friend id
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
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .post(celebrate(validation.followUser), jwtVerify, controller.follow)

routes.route(API_FRIEND_ID)
  /**
   * @swagger
   * /api/v1/friend/{id}:
   *  delete:
   *    summary: unfollow user
   *    tags: [Friend]
   *    description: api for unfollow user
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        description: friend id
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
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .delete(celebrate(validation.unfollowUser), jwtVerify, controller.unfollow)

routes.route(API_FRIEND_USER_ID)
  /**
   * @swagger
   * /api/v1/user/friend/{id}:
   *  get:
   *    summary: get user has follow
   *    tags: [Friend]
   *    description: api for get user has follow
   *    security:
   *      - jwt-auth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        description: friend id
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
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .get(celebrate(validation.getUserHasfollow), jwtVerify, controller.getUserHasFollow)

routes.route(API_FRIEND_FOLLOWERS_REQUEST)
  /**
   * @swagger
   * /api/v1/user/friend/request:
   *  get:
   *    summary: get user requested followers
   *    tags: [Friend]
   *    description: api for get get user requested followers
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
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .get(jwtVerify, controller.getRequestedFollowers)

routes.route(API_FRIEND_REQUEST_ID)
  /**
   * @swagger
   * /api/v1/friend/{id}/request:
   *  patch:
   *    summary: confirm follower request
   *    tags: [Friend]
   *    description: api for get confirm follower request
   *    parameters:
   *      - in: path
   *        name: id
   *        description: followers id
   *        schema:
   *          type: number
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .patch(celebrate(validation.confirmFollower), jwtVerify, controller.confirmFollower)


routes.route(API_FRIEND_REQUEST_ID)
  /**
   * @swagger
   * /api/v1/friend/{id}/request:
   *  delete:
   *    summary: unconfirm follower request
   *    tags: [Friend]
   *    description: api for get unconfirm follower request
   *    parameters:
   *      - in: path
   *        name: id
   *        description: followers id
   *        schema:
   *          type: number
   *    security:
   *      - jwt-auth: []
   *    responses:
   *      200:
   *        description: success
   *      400:
   *        description: validation error
   *      401:
   *        description: unauthorized
   *      404:
   *        description: user not found
   *      500:
   *        description: something went wrong
   */
  .delete(celebrate(validation.unconfirmFollower), jwtVerify, controller.unconfirmFollower)

routes.route(API_FRIEND_USER_TOTAL)
  /**
   * @swagger
   * /api/v1/user/friend/total:
   *  get:
   *    summary: get current user total followers and following
   *    tags: [Friend]
   *    description: api for get current user total followers and following
   *    security:
   *      - jwt-auth: []
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
  .get(jwtVerify, controller.getCurrentUserTotalFollowersAndFollowing)

routes.route(API_FREIND_USER_TOTAL_ID)
  /**
   * @swagger
   * /api/v1/user/{id}/friend/total:
   *  get:
   *    summary: get user total followers and following
   *    tags: [Friend]
   *    description: api for get user total followers and following
   *    parameters:
   *      - in: path
   *        name: id
   *        description: user id
   *        schema:
   *          type: number
   *          example: 2
   *    security:
   *      - jwt-auth: []
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
  .get(celebrate(validation.getUserTotalFollowingAndFollowers), jwtVerify, controller.getUserTotalFollowingAndFollowers)


routes.route(API_FRIEND_USER_FOLLOWERS)
  /**
   * @swagger
   * /api/v1/user/friend/followers:
   *  get:
   *    summary: get current user followers
   *    tags: [Friend]
   *    description: api for get current user followers
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
   *      - in: query
   *        name: search
   *        description: search followers
   *        schema:
   *          type: string
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
  .get(celebrate(validation.getCurrentUserFollowers), jwtVerify, controller.getCurrentUserFollowers)


routes.route(API_FRIEND_USER_FOLLOWING)
  /**
   * @swagger
   * /api/v1/user/friend/following:
   *  get:
   *    summary: get current user following
   *    tags: [Friend]
   *    description: api for get current user following
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
   *      - in: query
   *        name: search
   *        description: search following
   *        schema:
   *          type: string
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
  .get(celebrate(validation.getCurrentUserFollowing), jwtVerify, controller.getCurrentUserFollowing)

routes.route(API_FRIEND_USER_FOLLOWERS_ID)
  /**
   * @swagger
   * /api/v1/user/{id}/friend/followers:
   *  get:
   *    summary: get user followers
   *    tags: [Friend]
   *    description: api for get user followers
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
   *      - in: query
   *        name: search
   *        description: search followers
   *        schema:
   *          type: string
   *      - in: path
   *        name: id
   *        description: user id
   *        schema:
   *          type: number
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
  .get(celebrate(validation.getUserFollowers), jwtVerify, controller.getUserFollowers)


routes.route(API_FRIEND_USER_FOLLOWING_ID)
  /**
   * @swagger
   * /api/v1/user/{id}/friend/following:
   *  get:
   *    summary: get user following
   *    tags: [Friend]
   *    description: api for get user following
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
   *      - in: query
   *        name: search
   *        description: search following
   *        schema:
   *          type: string
   *      - in: path
   *        name: id
   *        description: user id
   *        schema:
   *          type: number
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
  .get(celebrate(validation.getUserFollowing), jwtVerify, controller.getUserFollowing)


const friendRoutes = routes
export default friendRoutes