import fs from "fs";
import db from "../config/db";
import ApiForbiddenError from "../exception/ApiForbiddenError";
import ApiNotFoundError from "../exception/ApiNotFoundError";
import ApiUnauthorizedError from "../exception/ApiUnauthorizedError";
import prismaError from "../exception/prisma-error";
import paginationHelper from "../helper/pagination.helper";
import ApiErrorResponse from "../exception/ApiErrorResponse";
import toPaginationResponseHelper from "../helper/to-pagination-response.helper";

const PostService = () => {
  const postRepo = db.post;
  const userRepo = db.user;
  const postLikeRepo = db.postUserLike;

  const createPost = async (data, { userId }) => {
    const { title, content, image } = data;
    try {
      const user = await userRepo.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) throw new ApiUnauthorizedError("Unauthorized");

      const newPost = await postRepo.create({
        data: {
          title,
          content,
          image,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true,
            },
          },
          comments: {
            select: {
              title: true,
              id: true,
              author: {
                select: {
                  photoProfile: true,
                  username: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      return newPost;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getAllPost = async (pageNo, size) => {
    try {
      const { skip, take } = paginationHelper(pageNo, size);
      const posts = await postRepo.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalData = await postRepo.count();
      const totalPages = Math.ceil(totalData / size);
      const currentPageData = posts.length;
      const isLast = pageNo === totalPages;

      return {
        currentPage: pageNo,
        currentPageData,
        totalData,
        totalPages,
        isLast,
        data: posts,
      };
    } catch (error) {
      throw prismaError(error);
    }
  };

  const updatePost = async (postId, user, data) => {
    try {
      const existingUser = await userRepo.findUnique({
        where: {
          id: user?.userId,
        },
      });
      if (!existingUser) throw new ApiNotFoundError("user not found");

      const post = await postRepo.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) throw ApiNotFoundError("post not found");

      if (post.authorId !== existingUser.id)
        throw new ApiForbiddenError("you cannot update this user post");

      const updatedPost = await postRepo.update({
        where: {
          id: postId,
        },
        data: {
          title: {
            set: data.title || post.title,
          },
          content: {
            set: data.content || post.content,
          },
        },
      });
      return updatedPost;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const deletePost = async (postId, user) => {
    try {
      const userExist = await userRepo.findUnique({
        where: {
          id: user.userId,
        },
      });
      if (!userExist) throw new ApiNotFoundError("user not found");

      const post = await postRepo.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) throw new ApiNotFoundError("post not found");

      if (post.authorId !== userExist.id)
        throw new ApiForbiddenError("you cannot delete this user post");

      const deletedPost = await postRepo.delete({
        where: {
          id: post.id,
        },
      });

      if (process.env.NODE_ENV !== "dev")
        fs.unlink(deletedPost.image, () => {});

      return deletedPost;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getPostById = async (postId) => {
    try {
      const post = await postRepo.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true,
            },
          },
        },
      });
      if (!post) throw new ApiNotFoundError("post not found");
      return post;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getAllPostByCurrentUser = async (pageNo, size, user) => {
    try {
      const { skip, take } = paginationHelper(pageNo, size);
      const postByUserId = await postRepo.findMany({
        where: {
          authorId: user?.userId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true,
            },
          },
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalData = await postRepo.count({
        where: {
          authorId: user?.userId,
        },
      });
      const totalPages = Math.ceil(totalData / size);
      const currentPageData = postByUserId.length;
      const isLast = pageNo === totalPages;

      return {
        data: postByUserId,
        totalPages,
        totalData,
        currentPageData,
        isLast,
      };
    } catch (error) {
      throw prismaError(error);
    }
  };

  const updatePostByUser = async (currentUser, pid, data) => {
    try {
      const trx = await db.$transaction(async (tr) => {
        const user = await tr.user.findUniqueOrThrow({
          where: {
            id: currentUser.userId,
          },
        });

        const post = await tr.post.update({
          where: {
            id: pid,
          },
          data: {
            title: {
              set: data.title,
            },
            content: {
              set: data.content,
            },
          },
        });

        if (user.id !== post.authorId)
          throw new ApiForbiddenError(
            "you cant update this specific user post"
          );
        return post;
      });
      return trx;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const deletePostByUser = async (pid, currUser) => {
    try {
      await db.$transaction(async (trx) => {
        const user = await trx.user.findUniqueOrThrow({
          where: {
            id: currUser.userId,
          },
        });

        const deletedPost = await trx.post.delete({
          where: {
            id: pid,
          },
        });
        if (!deletedPost) throw new ApiNotFoundError("post not found");
        if (user.id !== deletedPost.authorId)
          throw new ApiForbiddenError("you cant delete this user post");
        fs.unlink(deletedPost.image, () => {
          console.log("delete post image on api deletePostByUser");
        });
        return deletedPost;
      });
    } catch (error) {
      throw prismaError(error);
    }
  };

  const createPostByUser = async (currUser, data) => {
    try {
      const tr = await db.$transaction(async (tx) => {
        const { title, content, image } = data;
        const newPost = await tx.post.create({
          data: {
            title,
            content,
            image,
            author: {
              connect: {
                id: currUser.userId,
              },
            },
          },
          include: {
            author: {
              select: {
                username: true,
                photoProfile: true,
                id: true,
              },
            },
            comments: {
              select: {
                title: true,
                id: true,
                author: {
                  select: {
                    photoProfile: true,
                    username: true,
                    id: true,
                  },
                },
              },
            },
          },
        });
        return newPost;
      });

      return tr;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getAllPostHasLikedUser = async (currentUser, query) => {
    const { pageNo, size } = query;
    try {
      const { take, skip } = paginationHelper(pageNo, size);
      const posts = await postRepo.findMany({
        where: {
          likesBy: {
            some: {
              user: {
                id: currentUser.userId,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          image: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true,
            },
          },
        },
        take,
        skip,
      });

      const postCount = await postRepo.count({
        where: {
          likesBy: {
            some: {
              user: {
                id: currentUser.userId,
              },
            },
          },
        },
      });

      return toPaginationResponseHelper(postCount, posts, query);
    } catch (error) {
      throw prismaError(error);
    }
  };

  return {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPostByCurrentUser,
    updatePostByUser,
    deletePostByUser,
    createPostByUser,
    getAllPostHasLikedUser,
  };
};

export default PostService;
