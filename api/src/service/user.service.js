import db from "../config/db";
import ApiNotFoundError from "../exception/ApiNotFoundError";
import prismaError from "../exception/prisma-error";

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
          username: true,
          photoProfile: true,
          firstName: true,
          lastName: true,
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
          firstName: true,
          lastName: true,
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

  return {
    getUserById,
    getUserCurrent,
    updateProfile,
    getUserProfile,
  };
};
export default UserService;
