import httpStatus from "http-status"
import AuthService from "../../service/auth.service"
import authValidation from "../../controller/auth/auth.validation"
import ApiBadRequestError from "../../exception/ApiBadRequestError"
import jwtVerify from "../../middleware/jwt-verify"

const AuthController = () => {
  const service = AuthService()
  const validation = authValidation

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @param {import("express").NextFunction} next 
   * @returns 
   */

  const registerUser = async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        photoProfile: req?.file?.path
      }
      const response = await service.registerUser(data)
      res.status(httpStatus.CREATED).json({ message: "success register user", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const loginUser = async (req, res, next) => {
    try {
      const response = await service.loginUser(req.body)
      res.json({ message: "login success", data: response })
    } catch (error) {
      return next(error)
    }

  }

  const verifyToken = async (req, res, next) => {
    try {
      res.json(req.user)
    } catch (err) {
      return next(err)
    }
  }

  return {
    registerUser,
    loginUser,
    verifyToken
  }
}

export default AuthController
