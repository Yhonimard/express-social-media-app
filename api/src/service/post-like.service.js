import db from "../config/db";
import ApiConflictError from "../exception/ApiConflictError";
import ApiNotFoundError from "../exception/ApiNotFoundError";
import prismaError from "../exception/prisma-error";
import paginationHelper from "../helper/pagination.helper";
import toPaginationResponseHelper from "../helper/to-pagination-response.helper";

const PostLikeService = () => {
  const postUserLikeRepo = db.postUserLike;
  const postRepo = db.post;
  const likePost = async (currentUser, pid) => {
    try {
      const tr = await db.$transaction(async (tr) => {
        const existingPost = await tr.post.findUniqueOrThrow({
          where: {
            id: pid,
          },
        });

        const isUserHasLike = await tr.postUserLike.findUnique({
          where: {
            postId_userId: {
              postId: existingPost.id,
              userId: currentUser.userId,
            },
          },
        });

        if (isUserHasLike)
          throw new ApiConflictError("you have liked this post");

        const likedPost = await tr.postUserLike.create({
          data: {
            post: {
              connect: {
                id: existingPost.id,
              },
            },
            user: {
              connect: {
                id: currentUser.userId,
              },
            },
          },
        });
        return likedPost;
      });

      return tr;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const unlikePost = async (currentUser, pid) => {
    try {
      const tr = await db.$transaction(async (tr) => {
        const existingPost = await tr.post.findUniqueOrThrow({
          where: {
            id: pid,
          },
        });

        const isUserHasLike = await tr.postUserLike.findUnique({
          where: {
            postId_userId: {
              postId: existingPost.id,
              userId: currentUser.userId,
            },
          },
        });

        if (!isUserHasLike)
          throw new ApiNotFoundError("you haven't liked this post yet");

        const unlikedPost = await tr.postUserLike.delete({
          where: {
            postId_userId: {
              postId: existingPost.id,
              userId: currentUser?.userId,
            },
          },
        });
        return unlikedPost;
      });
      return tr;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getUserHasLikeByCurrentUser = async (currentUser, pid) => {
    try {
      const existingPost = await postRepo.findUniqueOrThrow({
        where: {
          id: pid,
        },
      });

      const userHasLike = await postUserLikeRepo.findUnique({
        where: {
          postId_userId: {
            postId: existingPost.id,
            userId: currentUser.userId,
          },
        },
      });
      return Boolean(userHasLike);
    } catch (error) {
      throw prismaError(error);
    }
  };

  return {
    likePost,
    unlikePost,
    getUserHasLikeByCurrentUser,
  };
};

export default PostLikeService;
