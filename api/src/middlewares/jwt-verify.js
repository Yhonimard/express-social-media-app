import config from "../config"
import ApiUnauthorizedError from "../exceptions/ApiUnauthorizedError"
import jwt from "jsonwebtoken"
import { User } from "../models"
import ApiNotFoundError from "../exceptions/ApiNotFoundError"
import ApiErrorResponse from "../exceptions/ApiErrorResponse"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const jwtVerify = async (req, res, next) => {
  try {
    const { jwtkey } = config("/")
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) return next(new ApiUnauthorizedError())
    const { username, id } = jwt.verify(token, jwtkey)

    const user = await User.findByPk(id)
    if (!user) throw new ApiUnauthorizedError()

    req.user = { id, username }
    next()
  } catch (error) {
    return next(new ApiErrorResponse(error.message, error.code))
  }
}

export default jwtVerify