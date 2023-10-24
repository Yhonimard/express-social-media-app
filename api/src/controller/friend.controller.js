import httpStatus from "http-status"
import FriendService from "../service/friend.service"
import friendValidation from "../validation/friend.validation"
import ApiBadRequestError from "../exception/ApiBadRequestError"

const FriendController = () => {
  const friendService = FriendService()
  const validation = friendValidation

  const followFriend = async (req, res, next) => {
    const { params, user } = req
    const currentUser = user
    try {
      const { error } = validation.addFriend.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await friendService.addFriend(params?.receiverId, currentUser)
      res.status(httpStatus.CREATED).json({ message: "success add friend", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const confirmFriend = async (req, res, next) => {
    const { params, user } = req
    const currentUser = user
    try {
      const { error } = validation.confirmFriend.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await friendService.confirmFriend(params?.senderId, currentUser)
      res.json({ message: "success confirm user", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const unconfirmFriend = async (req, res, next) => {
    const { params, user } = req
    const currentUser = user
    try {
      const { error } = validation.unconfirmFriend.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await friendService.unconfirmFriend(params?.senderId, currentUser)
      res.json({ message: "success unconfirm user", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const unfriend = async (req, res, next) => {
    const { params, user } = req
    const currentUser = user
    try {
      const { error } = validation.unfriend.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await friendService.unfriend(params?.receiverId, currentUser)
      res.json({ message: "success unfriend user", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const getUserHasLikeByCurrentUser = async (req, res, next) => {
    try {
      const { error } = validation.getUserHasFollow.params.validate(req.params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await friendService.getUserHasLikeByCurrentUser(req.user, req.params)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  return {
    followFriend,
    confirmFriend,
    unconfirmFriend,
    unfriend,
    getUserHasLikeByCurrentUser
  }

}
export default FriendController