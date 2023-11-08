import httpStatus from "http-status"
import AuthService from "../service/auth.service"
import authValidation from "../validation/auth.validation"
import ApiBadRequestError from "../exception/ApiBadRequestError"

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
      const registerData = {
        ...req.body,
        photoProfile: req?.file?.path
      }
      const { error } = validation.registerUser.body.validate(registerData)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await service.registerUser(registerData)
      res.status(httpStatus.CREATED).json({ message: "success register user", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const loginUser = async (req, res, next) => {
    const data = req.body
    try {
      const { error } = validation.loginUser.body.validate(data)
      if (error) throw new ApiBadRequestError(error.message)

      const response = await service.loginUser(data)
      res.json({ message: "login success", data: response })
    } catch (error) {
      return next(error)
    }

  }
  return {
    registerUser,
    loginUser
  }
}

export default AuthController