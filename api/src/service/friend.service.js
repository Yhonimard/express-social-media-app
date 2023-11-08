import httpStatus from "http-status"
import db from "../config/db"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"
import customPrismaError from "../exception/custom-prisma-error"
import paginationHelper from "../helper/pagination.helper"
import toPaginationResponseHelper from "../helper/to-pagination-response.helper"
import ApiForbiddenError from "../exception/ApiForbiddenError"

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
              },
            },
            sender: {
              connect: {
                id: senderId
              }
            }
          }
        }).catch((reason) => {
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

  const getUserHasFollow = async (currentUser, params) => {
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

  const getCurrentUserFriendRequest = async (currentUser, query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)
      const friendsReq = await userFriendRepo.findMany({
        where: {
          receiver: {
            id: currentUser.userId
          },
          confirmed: false
        },

        select: {
          id: true,
          confirmed: true,
          sender: {
            select: {
              username: true,
              id: true,
              photoProfile: true,
              profile: {
                select: {
                  name: true
                }
              }
            },
          },
          createdAt: true,
        },
        take,
        skip
      })

      const mapperData = friendsReq.map(f => ({
        id: f.id,
        confirmed: f.confirmed,
        createdAt: f.createdAt,
        user: {
          id: f.sender.id,
          photoProfile: f.sender.photoProfile,
          username: f.sender.username,
          name: f.sender.profile.name,
        }
      }))

      const friendReqCount = await userFriendRepo.count({
        where: {
          receiver: {
            id: currentUser.id
          },
          confirmed: false
        }
      })

      return toPaginationResponseHelper(friendReqCount, mapperData, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getCurrentUserFollowing = async (currentUser, query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)
      const friends = await userFriendRepo.findMany({
        where: {
          sender: {
            id: currentUser.userId
          },
          confirmed: true
        },
        select: {
          id: true,
          receiver: {
            select: {
              id: true,
              username: true,
              photoProfile: true,
              profile: {
                select: {
                  name: true
                }
              }
            }

          }

        },
        skip,
        take
      })

      const friendMapper = friends.map(f => ({
        id: f.id,
        user: {
          id: f.receiver.id,
          username: f.receiver.username,
          name: f.receiver.profile.name,
          photoProfile: f.receiver.photoProfile
        }
      }))

      const friendCounts = await userFriendRepo.count({
        where: {
          sender: {
            id: currentUser.userId
          },
          confirmed: true
        }
      })

      return toPaginationResponseHelper(friendCounts, friendMapper, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

  const confirmFriend = async (senderId, currentUser) => {
    const receiverId = currentUser?.userId
    try {

      await db.$transaction(async trx => {
        const confirmedFriendship = await trx.userFriend.findUnique({
          where: {
            senderId_receiverId: {
              senderId,
              receiverId
            },
          }
        })

        if (!confirmedFriendship) throw new ApiBadRequestError("That user hasn't follow you yet")
        if (currentUser.userId !== confirmedFriendship.receiverId) throw new ApiForbiddenError("you cant confirm this user friend")
        if (confirmedFriendship?.confirmed) throw new ApiBadRequestError("you have been confirm this user")

        await trx.userFriend.update({
          where: {
            id: confirmedFriendship.id,
            confirmed: false
          },
          data: {
            confirmed: true
          }
        })

      })
    } catch (error) {
      throw prismaError(error)
    }
  }

  const unconfirmFriend = async (senderId, currentUser) => {
    try {

      await db.$transaction(async tr => {
        if (senderId === currentUser.userId) throw new ApiForbiddenError("you cant unconfirm yourself")

        const existingFriendship = await tr.userFriend.findUnique({
          where: {
            senderId_receiverId: {
              senderId,
              receiverId: currentUser.userId
            }
          }
        })
        if (!existingFriendship) throw new ApiBadRequestError("That user hasn't follow you yet")
        if (currentUser.userId !== existingFriendship.receiverId) throw new ApiForbiddenError("you cant confirm this user follower")
        if (existingFriendship?.confirmed) throw new ApiBadRequestError("you have been confirm this user")

        await tr.userFriend.delete({
          where: {
            senderId_receiverId: {
              senderId,
              receiverId: currentUser.userId
            }
          },
        })
      })
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getCurrentuserFollowers = async (currentUser, query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)

      const followers = await userFriendRepo.findMany({
        where: {
          receiver: {
            id: currentUser.userId
          },
          confirmed: true
        },
        select: {
          id: true,
          sender: {
            select: {
              id: true,
              username: true,
              profile: {
                select: {
                  name: true
                }
              },
              photoProfile: true
            }
          }
        },
        skip,
        take
      })

      const mapperFollowers = followers.map(f => ({
        id: f.id,
        user: {
          id: f.sender.id,
          photoProfile: f.sender.photoProfile,
          username: f.sender.username,
          name: f.sender.profile.name
        }
      }))

      const followersCount = await userFriendRepo.count({
        where: {
          receiver: {
            id: currentUser.userId,
          },
          confirmed: true
        }
      })

      return toPaginationResponseHelper(followersCount, mapperFollowers, query)
    } catch (err) {
      throw prismaError(err)
    }
  }

  const deleteFollowers = async (currentUser, data) => {
    try {
      await db.$transaction(async tr => {
        const existingFollowers = await tr.userFriend.findUnique({
          where: {
            senderId_receiverId: {
              senderId: data.senderId,
              receiverId: currentUser.userId
            },
            confirmed: true
          }
        })
        if (!existingFollowers) throw new ApiNotFoundError("This user hasn't followed you yet")

        await tr.userFriend.delete({
          where: {
            id: existingFollowers.id
          }
        })
      })

    } catch (err) {
      throw prismaError(err)
    }
  }


  return {
    followUser,
    unfollowUser,
    getUserHasFollow,
    getCurrentUserFriendRequest,
    getCurrentUserFollowing,
    confirmFriend,
    unconfirmFriend,
    getCurrentuserFollowers,
    deleteFollowers
  }
}

export default FriendService 
