import jwt from "jsonwebtoken"
import ApiUnauthorizedError from "../exception/ApiUnauthorizedError"
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 */

const jwtVerify = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1]
    console.log(req.headers.authorization);
    if (!token) return next(new ApiUnauthorizedError("Unauthorized"))
    const encoded = jwt.verify(token, process.env.JWT_KEY)
    const { username, userId } = encoded
    req.user = {
      username,
      userId
    }

    next()
  } catch (error) {
    return next(new ApiUnauthorizedError("Unauthorized"))
  }
}

export default jwtVerify