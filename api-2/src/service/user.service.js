import db from "../config/db";
import ApiNotFoundError from "../exception/ApiNotFoundError";
import prismaError from "../exception/prisma-error";
import paginationHelper from "../helper/pagination.helper";
import toPaginationResponseHelper from "../helper/to-pagination-response.helper";

const UserService = () => {
  const userRepo = db.user;
  const userProfileRepo = db.profile;

  const getUserById = async (userId) => {
    try {
      const user = await userRepo.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          photoProfile: true,
          createdAt: true,
        },
      });

      if (!user) throw new ApiNotFoundError("user not found");
      return user;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getUserCurrent = async (currentUser) => {
    try {
      const user = await userRepo.findUnique({
        where: {
          id: currentUser?.userId,
        },
        select: {
          username: true,
          photoProfile: true,
          createdAt: true,
        },
      });
      if (!user) throw new ApiNotFoundError("user not found");
      return user;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getUserProfile = async (currentUser) => {
    try {
      const existingUser = await userRepo.findUniqueOrThrow({
        where: {
          id: currentUser.userId,
        },
      });

      const userProfile = await userProfileRepo.findUniqueOrThrow({
        where: {
          userId: existingUser.id,
        },
        select: {
          name: true,
          bio: true,
          birthday: true,
          createdAt: true,
          id: true,
          phone: true,
        },
      });
      const response = {
        ...userProfile,
        phone: parseInt(userProfile.phone),
      };
      return response;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const updateProfile = async (currentUser, data) => {
    try {
      const trx = await db.$transaction(async (tr) => {
        await tr.user.findUniqueOrThrow({
          where: {
            id: currentUser.userId,
          },
        });

        const updateProfile = await tr.profile.update({
          where: {
            userId: currentUser.userId,
          },
          data: {
            name: data.name !== null ? data.name : null,
            bio: data.bio !== null ? data.bio : null,
            birthday: data.birthday !== null ? data.birthday : null,
            phone: !isNaN(data.phone) ? data.phone : null,
          },
        });

        return {
          ...updateProfile,
          phone: parseInt(updateProfile.phone),
        };
      });
      return trx;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getUserProfileByUserId = async (params) => {
    try {
      const { uid } = params
      const userProfile = await userProfileRepo.findFirstOrThrow({
        where: {
          user: {
            id: uid
          }
        }
      })
      const mapperUserProfile = {
        ...userProfile,
        phone: parseInt(userProfile.phone)
      }
      return mapperUserProfile
    } catch (error) {
      throw prismaError(error)
    }
  }

  const searchUser = async (query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)
      const users = await userRepo.findMany({
        where: {
          OR: [
            {
              username: {
                contains: query.search
              },
            },
            {
              profile: {
                name: {
                  contains: query.search
                }
              }
            }
          ]
        },
        orderBy: {
          username: "asc"
        },
        select: {
          id: true,
          username: true,
          photoProfile: true,
          profile: {
            select: {
              name: true
            }
          }
        },
        take,
        skip
      })

      const mapperUsers = users.map(u => ({
        id: u.id,
        username: u.username,
        name: u.profile.name,
        photoProfile: u.photoProfile
      }))

      const userCount = await userRepo.count({
        where: {
          OR: [
            {
              username: {
                contains: query.search
              },
            },
            {
              profile: {
                name: {
                  contains: query.search
                }
              }
            }
          ]
        }
      })

      return toPaginationResponseHelper(userCount, mapperUsers, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

  return {
    getUserById,
    getUserCurrent,
    updateProfile,
    getUserProfile,
    getUserProfileByUserId,
    searchUser
  };
};
export default UserService;
