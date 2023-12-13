import ApiUnauthorizedError from "../../exceptions/ApiUnauthorizedError"
import sequelizeError from "../../exceptions/sequelize-error"
import { USER_TABLE_NAME } from "../../fixtures/models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { USER_ATTRIBUTES } from "./auth.constants"
import config from "../../config"
import ApiConflictError from "../../exceptions/ApiConflictError"

const AuthService = ({ userRepo }) => {
  const { jwtkey } = config("/")

  const register = async (data) => {
    try {
      
      const userExist = await userRepo.findOne({
        where: {
          username: data.username
        }
      })

      if (userExist) throw new ApiConflictError("user already exists")
      const signData = {
        ...data,
        password: await bcrypt.hash(data.password, 5)
      }

      await userRepo.create(signData)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const login = async (data) => {
    try {
      const user = await userRepo.findOne({
        where: {
          username: data.username
        },
        attributes: [...USER_ATTRIBUTES, "password"]
      })
      if (!user) throw new ApiUnauthorizedError()

      const isValidPassword = await bcrypt.compare(data.password, user.password)
      if (!isValidPassword) throw new ApiUnauthorizedError()

      const token = jwt.sign({ username: user.username, id: user.id }, jwtkey)
      delete user.password
      const response = {
        id: user.id,
        username: user.username,
        photo_profile: user.photo_profile,
        token
      }
      return response
    } catch (error) {
      throw sequelizeError(error, USER_TABLE_NAME)
    }
  }
  return {
    register,
    login,
  }
}

export default AuthService