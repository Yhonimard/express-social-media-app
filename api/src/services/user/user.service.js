import moment from "moment"
import ApiNotFoundError from "../../exceptions/ApiNotFoundError"
import sequelizeError from "../../exceptions/sequelize-error"
import { USER_BELONGS_TO_MANY_FRIEND_ALIAS, USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS, USER_FRIEND_AS_NAME, USER_HAS_ONE_USER_PROFILE_ALIAS } from "../../fixtures/models"
import { USER_ATTRIBUTES, USER_PROFILE_ATTRIBUTES } from "./user.constants"
import { Op, Sequelize } from "sequelize"
import jsPaginationHelper from "../../helper/js-pagination-helper"
import _ from "lodash"

const UserService = ({
  userRepo,
  userProfileRepo,
  sequelize
}) => {

  const getCurrentUser = async (user) => {
    try {
      const result = await userRepo.findByPk(user.id, {
        attributes: USER_ATTRIBUTES,
        include: [
          {
            association: USER_HAS_ONE_USER_PROFILE_ALIAS,
            attributes: ['name']
          }
        ],
      })

      const mappedResult = {
        id: result.id,
        username: result.username,
        photo_profile: result.photo_profile,
        name: result.profile.name,
      }

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getCurrentUserProfile = async (user) => {
    try {
      const existingUser = await userRepo.findByPk(user.id, { attributes: ['id'] })
      if (!existingUser) throw new ApiNotFoundError("user not found")

      const result = await userProfileRepo.findOne({
        where: {
          user_id: existingUser.id
        },
        attributes: USER_PROFILE_ATTRIBUTES
      })

      const mappedResult = {
        ...result.dataValues,
        birthday: result.dataValues.birthday ? moment(result.birthday).format("DD MMMM, YYYY") : null
      }

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserById = async (params) => {
    try {
      const { id } = params
      const user = await userRepo.findByPk(id, {
        attributes: USER_ATTRIBUTES,
        include: [
          {
            association: USER_HAS_ONE_USER_PROFILE_ALIAS,
            attributes: ['name']
          }
        ]
      })

      const mappedUser = {
        id: user.id,
        username: user.username,
        name: user.profile.name,
        photo_profile: user.photo_profile
      }


      return mappedUser
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const getProfileByUserId = async (params) => {
    try {
      const { id: user_id } = params
      const user = await userRepo.findByPk(user_id, { attributes: ['id'] })
      if (!user) throw new ApiNotFoundError("user not found")

      const result = await userProfileRepo.findOne({
        where: {
          user_id: user.id
        },
        attributes: USER_PROFILE_ATTRIBUTES
      })

      const mappedResult = {
        ...result.dataValues,
        birthday: result.birthday ? moment(result.birthday).format("DD MMMM, YYYY") : null
      }

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const updateProfile = async (data, user) => {
    try {
      await sequelize.transaction(async trx => {
        const profile = await userProfileRepo.findOne({
          where: {
            user_id: user.id
          },
          transaction: trx
        })
        if (!profile) throw new ApiNotFoundError('profile not found')

        const { name, phone, birthday, bio } = data

        await userProfileRepo.update({ name, phone, birthday, bio }, {
          where: {
            id: profile.id
          },
          transaction: trx
        })
      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const searchUser = async (query, user) => {
    try {
      let searchUser = {}
      if (query.search) {
        searchUser = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const followerUser = await userRepo.findAll({
        where: {
          ...searchUser,
          id: {
            [Op.ne]: user.id
          }
        },
        attributes: USER_ATTRIBUTES,
        include: [{
          association: USER_BELONGS_TO_MANY_FRIEND_ALIAS,
          attributes: [],
          through: {
            where: { friend_id: user.id, confirm: true },
            attributes: [],
            as: USER_FRIEND_AS_NAME
          },
          required: true,
        }],

        order: [
          [Sequelize.col(`${USER_BELONGS_TO_MANY_FRIEND_ALIAS}.${USER_FRIEND_AS_NAME}.updated_at`), 'DESC']
        ]

      })

      const followingUser = await userRepo.findAll({
        where: {
          ...searchUser,
          id: {
            [Op.ne]: user.id
          }
        },
        attributes: USER_ATTRIBUTES,
        include: [
          {
            attributes: [],
            association: USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS,
            through: {
              attributes: [],
              as: USER_FRIEND_AS_NAME,
              where: {
                user_id: user.id,
                confirm: true
              }
            },
            required: true
          }
        ],
        order: [
          [Sequelize.col(`${USER_BELONGS_TO_MANY_USER_FRIEND_ALIAS}.${USER_FRIEND_AS_NAME}.updated_at`), 'DESC']
        ]
      })
      const currentUserFriendsId = [...followerUser, ...followingUser].map(u => u.id)

      const anotherUser = await userRepo.findAll({
        where: {
          ...searchUser,
          id: {
            [Op.notIn]: currentUserFriendsId.concat(user.id),
          }
        },
        attributes: USER_ATTRIBUTES
      })

      const combinedResult = Array.from(new Set([...followerUser, ...followingUser, ...anotherUser]))

      const uniqueResult = _.uniqBy(combinedResult, 'id')

      return jsPaginationHelper(uniqueResult, query, 'users')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  return {
    getCurrentUser,
    getCurrentUserProfile,
    getUserById,
    getProfileByUserId,
    updateProfile,
    searchUser
  }
}

export default UserService
