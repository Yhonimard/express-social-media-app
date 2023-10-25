import httpStatus from "http-status"
import db from "../config/db"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"
import customPrismaError from "../exception/custom-prisma-error"

const FriendService = () => {

  const userRepo = db.user
  const userFriendRepo = db.userFriend

  const followUser = async (receiverId, currentUser) => {
    const senderId = currentUser?.userId
    try {

      // const existingUserSender = await userRepo.findUnique({
      //   where: {
      //     id: senderId
      //   }
      // })

      // const existingUserReceiver = await userRepo.findUnique({
      //   where: {
      //     id: receiverId
      //   }
      // })
      // if (!existingUserSender || !existingUserReceiver) throw new ApiNotFoundError("user not found")

      // const existingFriendship = await userFriendRepo.findFirst({
      //   where: {
      //     senderId: existingUserSender.id,
      //     receiverId: existingUserReceiver.id,
      //   }
      // })
      // if (existingFriendship) throw new ApiBadRequestError("friendship already exist")

      // const newFriendship = await userFriendRepo.create({
      //   data: {
      //     senderId: existingUserSender.id,
      //     receiverId: existingUserReceiver.id,
      //     confirmed: false
      //   }
      // })


      await db.$transaction(async tr => {
        if (senderId === receiverId) throw new ApiBadRequestError("you cant follow yourself")

        await tr.userFriend.create({
          data: {
            receiver: {
              connect: {
                id: receiverId
              }
            },
            sender: {
              connect: {
                id: senderId
              }
            }
          }
        }).catch((reason) => {
          console.log('reason', JSON.stringify(reason))
          throw customPrismaError(reason, { msgP2002: `you have been follow this user`, msgP2025: "user not found" })
        })

      })

      return
    } catch (error) {
      throw prismaError(error)
    }
  }

  const unfollowUser = async (receiverId, currentUser) => {
    const senderId = currentUser?.userId
    try {
      if (senderId === receiverId) throw new ApiBadRequestError("you cant unfollow yourself")
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

      const existingFriendship = await userFriendRepo.findUnique({
        where: {
          senderId_receiverId: {
            senderId: existingUserSender.id,
            receiverId: existingUserReceiver.id,
          }

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



  const getUserHasLikeByCurrentUser = async (currentUser, params) => {
    try {
      const { receiverId } = params
      const friendship = await userFriendRepo.findUnique({
        where: {
          senderId_receiverId: {
            senderId: currentUser.userId,
            receiverId
          }
        },
        select: {
          confirmed: true,
        }
      })

      const mapperResponse = {
        hasFollow: Boolean(friendship),
        confirmed: friendship?.confirmed
      }

      return mapperResponse
    } catch (error) {
      throw prismaError(error)
    }
  }


  return {
    followUser,
    unfollowUser,
    confirmFriend,
    unconfirmFriend,
    getUserHasLikeByCurrentUser
  }
}

export default FriendService