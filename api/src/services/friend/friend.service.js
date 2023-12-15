import moment from "moment/moment"
import { Op, Sequelize } from "sequelize"
import ApiBadRequestError from "../../exceptions/ApiBadRequestError"
import ApiConflictError from "../../exceptions/ApiConflictError"
import ApiNotFoundError from "../../exceptions/ApiNotFoundError"
import sequelizeError from "../../exceptions/sequelize-error"
import {
  USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS,
  USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS,
  USER_HAS_ONE_USER_PROFILE_ALIAS
} from "../../fixtures/models"
import paginationHelper from "../../helper/pagination-helper"
import toPaginationHelper from "../../helper/to-pagination-helper"
import { USER_ATTRIBUTES } from "./friend.constants"
import _ from "lodash"

const FriendService = ({
  userRepo,
  userFriendRepo,
  sequelize
}) => {


  const follow = async (user, params) => {
    try {
      const { id: friend_id } = params

      await sequelize.transaction(async trx => {
        if (friend_id === user.id) throw new ApiBadRequestError('you cant follow yourself')

        const receiver = await userRepo.findByPk(friend_id, { attributes: ['id'] })
        if (!receiver) throw new ApiNotFoundError('user not found')

        const isHasFollow = await receiver.hasFollower(user.id)

        if (isHasFollow) throw new ApiConflictError('you has been follow this user')

        await userFriendRepo.create({
          user_id: user.id,
          friend_id
        }, { transaction: trx })

      })
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const unfollow = async (user, params) => {
    try {
      const { id: friend_id } = params

      await sequelize.transaction(async trx => {
        if (friend_id === user.id) throw new ApiBadRequestError('you cant unfollow yourself')

        const friend = await userRepo.findByPk(friend_id)
        if (!friend) throw new ApiNotFoundError('user not found')

        const isHasFollow = await friend.hasFollower(user.id)
        if (!isHasFollow) throw new ApiBadRequestError('you have not yet unfollow this user')

        await userFriendRepo.destroy({
          where: {
            user_id: user.id,
            friend_id
          },
          transaction: trx,
        })
      })
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const getUserHasFollow = async (user, params) => {
    try {
      const { id: friend_id } = params
      if (friend_id === user.id) throw new ApiBadRequestError('you cant follow yourself')
      const result = await userFriendRepo.findOne({
        where: {
          user_id: user.id,
          friend_id
        }
      })
      return Boolean(result)
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const getRequestedFollowers = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)

      const followers = await userFriendRepo.findAndCountAll({
        where: {
          friend_id: user.id,
          confirm: false
        },
        attributes: ['confirm', 'created_at'],
        include: [
          {
            association: USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS,
            attributes: USER_ATTRIBUTES,
          },
        ],
        limit,
        offset
      })

      const mappedFollowers = followers.rows.map(p => ({
        ...p.dataValues.follower.dataValues,
        confirm: p.dataValues.confirm,
        created_at: moment(p.dataValues.created_at).format("DD MMM, YYYY")
      }))

      return toPaginationHelper(mappedFollowers, followers.count, query, "followers")
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const confirmFollower = async (user, params) => {
    try {
      const { id: follower_id } = params

      await sequelize.transaction(async trx => {

        const follower = await userRepo.findByPk(follower_id, { attributes: ['id', 'username'] })
        if (!follower) throw new ApiNotFoundError('follower not found')

        const hasFollowing = await follower.hasFollowing(user.id)
        if (!hasFollowing) throw new ApiNotFoundError(`${follower.username} has never following you`)

        await userFriendRepo.update({ confirm: true }, {
          where: {
            user_id: follower.id,
            friend_id: user.id
          }
        }, { transaction: trx })
      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const unconfirmFollower = async (user, params) => {
    try {
      const { id: follower_id } = params

      await sequelize.transaction(async trx => {
        const follower = await userRepo.findByPk(follower_id, { attributes: ['id', 'username'] })
        if (!follower) throw new ApiNotFoundError('follower not found')

        const isHasFollowing = await follower.hasFollowing(user.id)
        if (!isHasFollowing) throw new ApiNotFoundError(`${follower.username} has never following you`)

        await userFriendRepo.destroy({
          where: {
            user_id: follower.id,
            friend_id: user.id
          },
          transaction: trx
        })

      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getCurrentUserTotalFollowersAndFollowing = async (user) => {
    try {
      const following = await userFriendRepo.count({
        where: {
          user_id: user.id
        }
      })

      const followers = await userFriendRepo.count({
        where: {
          friend_id: user.id
        }
      })

      const mappedResult = {
        following,
        followers
      }

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserTotalFollowingAndFollowers = async (params) => {
    try {
      const { id: user_id } = params

      const user = await userRepo.findByPk(user_id)
      if (!user) throw new ApiNotFoundError('user not found')

      const following = await userFriendRepo.count({
        where: {
          user_id
        }
      })

      const followers = await userFriendRepo.count({
        where: {
          friend_id: user_id
        }
      })

      const mappedResult = {
        following,
        followers
      }

      console.log(mappedResult);

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const getCurrentUserFollowers = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)


      let followersSearch = {}

      if (query.search) {
        followersSearch = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const followers = await userFriendRepo.findAndCountAll({
        where: {
          friend_id: user.id,
          confirm: true
        },
        attributes: [],
        include: [
          {
            association: USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS,
            attributes: USER_ATTRIBUTES,
            where: {
              ...followersSearch
            },
            include: [
              {
                association: USER_HAS_ONE_USER_PROFILE_ALIAS,
                attributes: ['name']
              }
            ],
          }
        ],
        order: [
          ['created_at', 'DESC']
        ],
        limit,
        offset,
      })

      const mappedFollowers = followers.rows.map(f => ({
        id: f.dataValues.follower.dataValues.id,
        username: f.dataValues.follower.dataValues.username,
        photo_profile: f.dataValues.follower.dataValues.photo_profile,
        name: f.dataValues.follower.dataValues.profile.dataValues.name
      }))

      return toPaginationHelper(mappedFollowers, followers.count, query, 'followers')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getCurrentUserFollowing = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)

      let followingSearch = {}
      if (query.search) {
        followingSearch = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const following = await userFriendRepo.findAndCountAll({
        where: {
          user_id: user.id,
          confirm: true
        },
        attributes: [],
        include: [
          {
            association: USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS,
            attributes: USER_ATTRIBUTES,
            where: {
              ...followingSearch
            },
            include: [
              {
                association: USER_HAS_ONE_USER_PROFILE_ALIAS,
                attributes: ['name']
              }
            ]
          }
        ],
        limit,
        offset
      })


      const mappedFollowing = following.rows.map(f => ({
        id: f.dataValues.following.dataValues.id,
        username: f.dataValues.following.dataValues.username,
        photo_profile: f.dataValues.following.dataValues.photo_profile,
        name: f.dataValues.following.dataValues.profile.dataValues.name
      }))

      return toPaginationHelper(mappedFollowing, following.count, query, 'following')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserFollowers = async (params, query, user) => {
    try {
      const { limit, offset } = paginationHelper(query)
      const { id: user_id } = params
      if (user_id === user.id) throw new ApiBadRequestError(`you should search ${user.username} followers on different account`)


      let followersSearch = {}

      if (query.search) {
        followersSearch = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const followers = await userFriendRepo.findAndCountAll({
        where: {
          friend_id: user_id,
          confirm: true
        },
        attributes: [],
        include: [
          {
            association: USER_FRIEND_BELONGS_TO_USER_FOLLOWER_ALIAS,
            attributes: USER_ATTRIBUTES,
            where: {
              ...followersSearch
            },
            include: [
              {
                association: USER_HAS_ONE_USER_PROFILE_ALIAS,
                attributes: ['name']
              }
            ],
          }
        ],
        order: [
          ['created_at', 'DESC']
        ],
        limit,
        offset,
      })

      const mappedFollowers = followers.rows.map(f => ({
        id: f.dataValues.follower.dataValues.id,
        username: f.dataValues.follower.dataValues.username,
        photo_profile: f.dataValues.follower.dataValues.photo_profile,
        name: f.dataValues.follower.dataValues.profile.dataValues.name
      }))

      return toPaginationHelper(mappedFollowers, followers.count, query, 'followers')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserFollowing = async (params, query, user) => {
    try {
      const { limit, offset } = paginationHelper(query)
      const { id: user_id } = params
      if (user_id === user.id) throw new ApiBadRequestError(`you should search ${user.username} following on different account`)

      let followingSearch = {}
      if (query.search) {
        followingSearch = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const following = await userFriendRepo.findAndCountAll({
        where: {
          user_id,
          confirm: true
        },
        attributes: [],
        include: [
          {
            association: USER_FRIEND_BELONGS_TO_USER_FOLLOWING_ALIAS,
            attributes: USER_ATTRIBUTES,
            where: {
              ...followingSearch
            },
            include: [
              {
                association: USER_HAS_ONE_USER_PROFILE_ALIAS,
                attributes: ['name']
              }
            ]
          }
        ],
        limit,
        offset
      })


      const mappedFollowing = following.rows.map(f => ({
        id: f.dataValues.following.dataValues.id,
        username: f.dataValues.following.dataValues.username,
        photo_profile: f.dataValues.following.dataValues.photo_profile,
        name: f.dataValues.following.dataValues.profile.dataValues.name
      }))

      return toPaginationHelper(mappedFollowing, following.count, query, 'following')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  return {
    follow,
    unfollow,
    getUserHasFollow,
    getRequestedFollowers,
    confirmFollower,
    unconfirmFollower,
    getCurrentUserTotalFollowersAndFollowing,
    getUserTotalFollowingAndFollowers,
    getCurrentUserFollowers,
    getCurrentUserFollowing,
    getUserFollowers,
    getUserFollowing
  }
}

export default FriendService