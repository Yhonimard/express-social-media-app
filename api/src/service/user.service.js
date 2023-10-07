import db from "../config/db"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"

const UserService = () => {
  const userRepo = db.user
  const userProfileRepo = db.profile

  const getUserById = async (userId) => {
    try {
      const user = await userRepo.findUnique({
        where: {
          id: userId
        },
        select: {
          username: true,
          photoProfile: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        }
      })
      if (!user) throw new ApiNotFoundError("user not found")
      return user
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getUserCurrent = async (currentUser) => {
    try {
      const user = await userRepo.findUnique({
        where: {
          id: currentUser?.userId
        },
        select: {
          username: true,
          photoProfile: true,
          firstName: true,
          lastName: true,
          createdAt: true
        },
      })
      if (!user) throw new ApiNotFoundError("user not found")
      return user
    } catch (error) {
      throw prismaError(error)
    }
  }

  const updateProfile = async (currentUser, data) => {
    try {
      const trx = db.$transaction(async (tr) => {

        const existingUser = await tr.user.findUniqueOrThrow({
          where: {
            id: currentUser?.userId
          }
        })

        const updatedProfile = await tr.profile.update({
          where: {
            userId: existingUser.id
          },
          data: {
            bio: data.bio !== null ? data.bio : undefined,
            birthday: data.birthday !== null ? data.birthday : undefined,
            phone: data.phone !== null ? data.phone : undefined
          }
        })

        return updatedProfile
      })
      return trx
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getUserProfile = async (currentUser) => {
    try {
      const existingUser = await userRepo.findUniqueOrThrow({
        where: {
          id: currentUser.userId
        }
      })
      
      const userProfile = await userProfileRepo.findUniqueOrThrow({
        where: {
          userId: existingUser.id
        },
        select: {
          bio: true,
          birthday: true,
          createdAt: true,
          id: true,
          phone: true
        }
      })

      return userProfile
    } catch (error) {
      throw prismaError(error)
    }
  }


  return {
    getUserById,
    getUserCurrent,
    updateProfile,
    getUserProfile
  }
}
export default UserService