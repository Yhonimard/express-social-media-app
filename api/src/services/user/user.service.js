import moment from "moment"
import ApiNotFoundError from "../../exceptions/ApiNotFoundError"
import sequelizeError from "../../exceptions/sequelize-error"
import { USER_HAS_ONE_USER_PROFILE_ALIAS } from "../../fixtures/models"
import { USER_ATTRIBUTES, USER_PROFILE_ATTRIBUTES } from "./user.constants"
import { Op, Sequelize } from "sequelize"
import paginationHelper from "../../helper/pagination-helper"
import toPaginationHelper from "../../helper/to-pagination-helper"

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

  const searchUser = async (query) => {
    try {
      const { limit, offset } = paginationHelper(query)

      let searchUser = {}

      if (query.search) {
        searchUser = {
          username: {
            [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
          }
        }
      }

      const result = await userRepo.findAndCountAll({
        where: {
          ...searchUser
        },
        attributes: USER_ATTRIBUTES,
        limit,
        offset
      })

      return toPaginationHelper(result.rows, result.count, query, 'users')
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