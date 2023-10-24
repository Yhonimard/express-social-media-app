import httpStatus from "http-status"
import db from "../config/db"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"

const FriendService = () => {

  const userRepo = db.user
  const userFriendRepo = db.userFriend

  const followUser = async (receiverId, currentUser) => {
    const senderId = currentUser?.userId
    try {
      if (senderId === receiverId) throw new ApiBadRequestError("you cannot send friend request to yourself")

      const existingUserSender = await userRepo.findUnique({
        where: {
          id: senderId
        }
      })

      const existingUserReceiver = await userRepo.findUnique({
        where: {
          id: receiverId
        }
      })
      if (!existingUserSender || !existingUserReceiver) throw new ApiNotFoundError("user not found")

      const existingFriendship = await userFriendRepo.findFirst({
        where: {
          senderId: existingUserSender.id,
          receiverId: existingUserReceiver.id,
        }
      })
      if (existingFriendship) throw new ApiBadRequestError("friendship already exist")

      const newFriendship = await userFriendRepo.create({
        data: {
          senderId: existingUserSender.id,
          receiverId: existingUserReceiver.id,
          confirmed: false
        }
      })

      return newFriendship
    } catch (error) {
      throw prismaError(error)
    }
  }

  const confirmFriend = async (senderId, currentUser) => {
    const receiverId = currentUser?.userId
    try {
      const existingUserSender = await userRepo.findUnique({
        where: {
          id: senderId
        }
      })

      const existingUserReceiver = await userRepo.findUnique({
        where: {
          id: receiverId
        }
      })
      if (!existingUserSender || !existingUserReceiver) throw new ApiNotFoundError("user not found")

      const existingFriendship = await userFriendRepo.findFirst({
        where: {
          senderId: existingUserSender.id,
          receiverId: existingUserReceiver.id,
        }
      })
      if (!existingFriendship) throw new ApiNotFoundError("friendship not found")
      if (existingFriendship?.confirmed) throw new ApiBadRequestError("you have become friend with this user")
      if (receiverId !== existingFriendship?.receiverId) throw new ApiErrorResponse("youare not allowed to confirm this user friendship", httpStatus.FORBIDDEN)

      const confirmedFriendship = await userFriendRepo.update({
        where: {
          id: existingFriendship.id
        },
        data: {
          confirmed: true
        }
      })
      return confirmedFriendship
    } catch (error) {
      throw prismaError(error)
    }
  }

  const unconfirmFriend = async (senderId, currentUser) => {
    const receiverId = currentUser?.userId
    try {
      const existingUserSender = await userRepo.findUnique({
        where: {
          id: senderId
        }
      })

      const existingUserReceiver = await userRepo.findUnique({
        where: {
          id: receiverId
        }
      })
      if (!existingUserSender || !existingUserReceiver) throw new ApiNotFoundError("user not found")

      const existingFriendship = await userFriendRepo.findFirst({
        where: {
          senderId: existingUserSender.id,
          receiverId: existingUserReceiver.id,
          confirmed: false
        }
      })
      if (!existingFriendship) throw new ApiNotFoundError("friendship not found")
      if (existingFriendship.receiverId !== receiverId) throw new ApiErrorResponse("you are not allowed to unconfirm this user friendship", httpStatus.FORBIDDEN)

      const deletedFriendship = await userFriendRepo.delete({
        where: {
          id: existingFriendship.id,
        }
      })

      return deletedFriendship
    } catch (error) {
      throw prismaError(error)
    }
  }

  const unfriend = async (receiverId, currentUser) => {
    const senderId = currentUser?.userId
    try {
      if (senderId === receiverId) throw new ApiBadRequestError("you cant unfriend yourself")
      const existingUserSender = await userRepo.findUnique({
        where: {
          id: senderId
        }
      })

      const existingUserReceiver = await userRepo.findUnique({
        where: {
          id: receiverId
        }
      })
      if (!existingUserSender || !existingUserReceiver) throw new ApiNotFoundError("user not found")

      const existingFriendship = await userFriendRepo.findFirst({
        where: {
          senderId: existingUserSender.id,
          receiverId: existingUserReceiver.id,
          confirmed: true
        }
      })
      if (!existingFriendship) throw new ApiNotFoundError("friendship not found")

      const deletedFriendship = await userFriendRepo.delete({
        where: {
          id: existingFriendship.id
        }
      })
      return deletedFriendship
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getUserHasLikeByCurrentUser = async (currentUser, params) => {
    try {
      const { receiverId } = params
      const response = await userFriendRepo.findUnique({
        where: {
          senderId_receiverId: {
            senderId: currentUser.userId,
            receiverId
          }
        }
      })
      return Boolean(response)
    } catch (error) {
      throw prismaError(error)
    }
  }


  return {
    followUser,
    confirmFriend,
    unconfirmFriend,
    unfriend,
    getUserHasLikeByCurrentUser
  }
}

export default FriendService