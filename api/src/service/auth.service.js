import { Prisma } from "@prisma/client"
import db from "../config/db"
import prismaError from "../exception/prisma-error"
import ApiUnauthorizedError from "../exception/ApiUnauthorizedError"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import httpStatus from "http-status"
import ApiForbiddenError from "../exception/ApiForbiddenError"
import ApiNotFoundError from "../exception/ApiNotFoundError"

const AuthService = () => {
  const userRepo = db.user

  const registerUser = async (registerData) => {
    const { username, password } = registerData

    try {
      const existingUser = await userRepo.findFirst({ where: { username: username } })
      if (existingUser) throw new ApiErrorResponse("username already exist", httpStatus.CONFLICT)

      const encodedPassword = await bcrypt.hash(password, 8)

      const userWillSave = {
        username,
        password: encodedPassword,
        photoProfile: registerData.photoProfile
      }

      const savedUser = await userRepo.create({
        data: userWillSave,
      })

      const token = jwt.sign({ username: savedUser.username, userId: savedUser.id }, process.env.JWT_KEY)

      const response = {
        username: savedUser.username,
        id: savedUser.id,
        photoProfile: savedUser.photoProfile,
        token
      }
      return response
    } catch (error) {
      throw prismaError(error)
    }
  }

  const loginUser = async (loginData) => {
    const { username, password } = loginData
    try {
      const existingUser = await userRepo.findFirst({ where: { username: username } })
      if (!existingUser) throw new ApiNotFoundError("username not found")

      const isValidPassword = await bcrypt.compare(password, existingUser.password)
      if (!isValidPassword) throw new ApiUnauthorizedError("Unauthorized")

      const token = jwt.sign({ username: existingUser.username, userId: existingUser.id }, process.env.JWT_KEY)
      if (!token) throw new ApiForbiddenError("Authentication failed")

      const response = {
        username: existingUser.username,
        id: existingUser.id,
        photoProfile: existingUser.photoProfile,
        token
      }
      return response
    } catch (error) {
      throw prismaError(error)
    }

  }

  return {
    registerUser,
    loginUser
  }
}
export default AuthService