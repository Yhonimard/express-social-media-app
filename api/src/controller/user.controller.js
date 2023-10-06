import httpStatus from "http-status"
import UserService from "../service/user.service"
import userValidation from "../validation/user.validation"
import ApiBadRequestError from "../exception/ApiBadRequestError"

const UserController = () => {
  const userService = UserService()
  const validation = userValidation

  const getUserById = async (req, res, next) => {
    const { params } = req
    try {
      const { error } = validation.getUserById.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await userService.getUserById(params?.userId)
      res.json({ message: "success get user by id", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const getUserCurrent = async (req, res, next) => {
    const { user } = req
    const currentUser = user
    try {
      const response = await userService.getUserCurrent(currentUser)
      res.json({ message: "success get user user current", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const updateProfile = async (req, res, next) => {
    try {
      const { error } = validation.updateProfile.body.validate(req.body)
      if (error) throw new ApiBadRequestError(error.message)

      const response = await userService.updateProfile(req.user, req.body)
      res.json({ message: "success update user profile", data: response })

    } catch (error) {
      return next(error)
    }
  }

  return {
    getUserById,
    getUserCurrent,
    updateProfile
  }

}

export default UserController