import fs from "fs";
import _ from "lodash";
import moment from "moment";
import db from "../../config/db";
import ApiForbiddenError from "../../exception/ApiForbiddenError";
import ApiNotFoundError from "../../exception/ApiNotFoundError";
import ApiUnauthorizedError from "../../exception/ApiUnauthorizedError";
import prismaError from "../../exception/prisma-error";
import paginationHelper from "../../helper/pagination.helper";
import toPaginationResponseHelper from "../../helper/to-pagination-response.helper";
import {
  AUTHOR_ATTRIBUTES,
  COMMENT_ATTRIBUTES,
  POST_ATTRIBUTES
} from "./post.constants";

const PostService = () => {
  const postRepo = db.post;
  const userRepo = db.user;

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
            select: AUTHOR_ATTRIBUTES,
          },
          comments: {
            select: {
              ...COMMENT_ATTRIBUTES,
              author: {
                select: AUTHOR_ATTRIBUTES
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
          ...POST_ATTRIBUTES,
          author: {
            select: AUTHOR_ATTRIBUTES
          }
        },
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
      });

      const postMapper = posts.map(p => ({
        ...p,
        createdAt: moment(p.createdAt).format("DD MMMM, YYYY")
      }))

      const shufflePosts = _.shuffle(postMapper)


      const postCount = await postRepo.count()
      return toPaginationResponseHelper(postCount, shufflePosts, { pageNo, size })
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
        fs.unlink(deletedPost.image, () => { });

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
          ...POST_ATTRIBUTES,
          author: {
            select: AUTHOR_ATTRIBUTES
          },
        },
      });
      if (!post) throw new ApiNotFoundError("post not found");

      const postMapper = Object.assign(post, {
        createdAt: moment(post.createdAt).format("DD MMMM, YYYY")
      }
      )

      return postMapper;
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
          ...POST_ATTRIBUTES,
          author: {
            select: AUTHOR_ATTRIBUTES,
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
          authorId: user.userId,
        },
      });

      return toPaginationResponseHelper(totalData, postByUserId, { pageNo, size })
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
          select: {
            ...POST_ATTRIBUTES,
            author: {
              select: AUTHOR_ATTRIBUTES
            }
          }
          // include: {
          //   author: {
          //     select: AUTHOR_ATTRIBUTES,
          //   },
          //   comments: {
          //     select: {
          //       title: true,
          //       id: true,
          //       author: {
          //         select: {
          //           photoProfile: true,
          //           username: true,
          //           id: true,
          //         },
          //       },
          //     },
          //   },
          // },
        });
        return newPost;
      });

      return tr;
    } catch (error) {
      throw prismaError(error);
    }
  };

  const getAllPostHasLikedCurrentUser = async (currentUser, query) => {
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
          ...POST_ATTRIBUTES,
          author: {
            select: AUTHOR_ATTRIBUTES
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

  const getPostByAuthorId = async (params, query) => {
    try {
      const { uid } = params
      await userRepo.findUniqueOrThrow({
        where: {
          id: uid
        }
      })

      const { skip, take } = paginationHelper(query.pageNo, query.size)

      const posts = await postRepo.findMany({
        where: {
          author: {
            id: uid
          }
        },

        select: {
          ...POST_ATTRIBUTES,
          author: {
            select: AUTHOR_ATTRIBUTES
          },
        },
        
        skip,
        take
      })

      const postCountsByUid = await postRepo.count({
        where: {
          author: {
            id: uid
          }
        }
      })

      return toPaginationResponseHelper(postCountsByUid, posts, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

  const searchPost = async (query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)
      const posts = await postRepo.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query.search,
              },
            },
            {
              content: {
                contains: query.search
              }
            }
          ],
        },
        select: {
          id: true,
          title: true,
          content: true
        },
        skip,
        take,
        orderBy: {
          title: "asc",
        },
      })

      const postsCount = await postRepo.count({
        where: {
          OR: [
            {
              title: {
                contains: query.search
              }
            },
            {
              content: {
                contains: query.search
              }
            }
          ]
        }
      })

      return toPaginationResponseHelper(postsCount, posts, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

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
    getAllPostHasLikedCurrentUser,
    getPostByAuthorId,
    searchPost
  };
};

export default PostService;
