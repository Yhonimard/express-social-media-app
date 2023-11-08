import httpStatus from "http-status"
import db from "../config/db"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"
import paginationHelper from "../helper/pagination.helper"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiForbiddenError from "../exception/ApiForbiddenError"
import toPaginationResponseHelper from "../helper/to-pagination-response.helper"

const CommentService = () => {
  const userRepo = db.user
  const postRepo = db.post
  const commentRepo = db.comment
  const commentPostLikeRepo = db.commentPostLike

  const createComment = async (postId, { userId }, data) => {
    try {
      const user = await userRepo.findUnique({
        where: {
          id: userId
        }
      })
      if (!user) throw new ApiNotFoundError("user not found")

      const post = await postRepo.findUnique({
        where: {
          id: postId
        }
      })
      if (!post) throw new ApiNotFoundError("post not found")

      const newComment = await commentRepo.create({
        data: {
          title: data.title,
          author: {
            connect: {
              id: user.id
            },
          },
          post: {
            connect: {
              id: post.id
            }
          }
        }
      })
      return newComment
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getCommentByPostId = async (postId, pageNo = 1, size = 1) => {
    try {

      const { skip, take } = paginationHelper(pageNo, size)

      const post = await postRepo.findUnique({
        where: {
          id: postId
        }
      })
      if (!post) throw new ApiNotFoundError("post not found")

      const comments = await commentRepo.findMany({
        where: {
          postId: postId,
        },
        select: {
          id: true,
          createdAt: true,
          title: true,
          author: {
            select: {
              username: true,
              photoProfile: true,
              id: true
            }
          },
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc"
        }
      })
      if (!comments) throw new ApiNotFoundError("post not found")

      const totalData = await commentRepo.count({
        where: {
          postId
        }
      })
      const totalPages = Math.ceil(totalData / size)
      const currentPageData = comments.length
      const isLast = comments.length >= 1 ? pageNo === totalPages : true

      return {
        currentPage: pageNo,
        data: comments,
        totalData,
        totalPages,
        currentPageData,
        isLast
      }
    } catch (error) {
      throw prismaError(error)
    }
  }

  const updateCommentByPostId = async (postId, commentId, data, currentUser) => {
    try {
      const existingUser = await userRepo.findFirstOrThrow({
        where: {
          id: currentUser.userId
        },
      })

      const existingPost = await postRepo.findUniqueOrThrow({
        where: {
          id: postId
        }
      })

      const transaction = await db.$transaction(async (tx) => {

        const updatedComment = await tx.comment.update({
          where: {
            id: commentId
          },
          data: {
            title: data.title,
          }
        })
        if (existingUser.id !== updatedComment.authorId) throw new ApiForbiddenError("you cant update this comment user")
        if (existingPost.id !== updatedComment.postId) throw new ApiBadRequestError("comment doesnt belong to post")
        return updatedComment
      }, {})

      return transaction
    } catch (error) {
      throw prismaError(error)
    }
  }


  const deleteCommentByPostId = async (postId, commentId, currentUser) => {
    try {


      const tr = await db.$transaction(async (tx) => {
        const existingUser = await tx.user.findUniqueOrThrow({
          where: {
            id: currentUser.userId
          }
        })
        const existingPost = await tx.post.findUniqueOrThrow({
          where: {
            id: postId
          }
        })
        const deletedComment = await tx.comment.delete({
          where: {
            id: commentId
          }
        })

        if (existingUser.id !== deletedComment.authorId) throw new ApiForbiddenError("you cant delete this user comment")
        if (existingPost.id !== deletedComment.postId) throw new ApiBadRequestError("comment doesnt belong to post")

        return deletedComment
      })
      return tr
    } catch (error) {
      throw prismaError(error)
    }
  }

  const getCommentHasCommentedCurrentUser = async (currentUser, query) => {
    const { pageNo, size } = query
    try {

      const { take, skip } = paginationHelper(pageNo, size)

      const comments = await commentRepo.findMany({
        where: {
          author: {
            id: currentUser.userId
          }
        },
        select: {
          createdAt: true,
          id: true,
          post: {
            select: {
              id: true
            }
          },
          title: true
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc"
        }
      })

      const commentsCount = await commentRepo.count({
        where: {
          author: {
            id: currentUser.userId
          }
        }
      })

      return toPaginationResponseHelper(commentsCount, comments, query)
    } catch (error) {
      throw prismaError(error)
    }
  }


  const likeCommentByCurruser = async (currUser, body) => {
    try {

      await db.$transaction(async trx => {

        const existingLike = await trx.commentPostLike.findUnique({
          where: {
            userId_commentId: {
              commentId: body.commentId,
              userId: currUser.userId
            }
          }
        })

        if (existingLike) throw new ApiBadRequestError("you have been like this comment")

        await trx.commentPostLike.create({
          data: {
            comment: {
              connect: {
                id: body.commentId,
              },
            },
            user: {
              connect: {
                id: currUser.userId
              }
            }
          }
        })
      })

    } catch (error) {
      throw prismaError(error)
    }
  }

  const unlikeCommentByCurrentUser = async (currUser, body) => {
    try {
      await db.$transaction(async tr => {
        const existingLike = await tr.commentPostLike.findUnique({
          where: {
            userId_commentId: {
              userId: currUser.userId,
              commentId: body.commentId
            }
          }
        })

        if (!existingLike) throw new ApiBadRequestError("you have not like this comment yet")

        await tr.commentPostLike.delete({
          where: {
            id: existingLike.id
          }
        })

      })


    } catch (err) {
      throw prismaError(err)
    }
  }

  const getCurrUserHasLikeComment = async (currUser, params) => {
    try {
      const hasLike = await commentPostLikeRepo.findUnique({
        where: {
          userId_commentId: {
            userId: currUser.userId,
            commentId: params.cid
          }
        }
      })
      return Boolean(hasLike)
    } catch (error) {
      throw prismaError(error)
    }
  }


  return {
    createComment,
    getCommentByPostId,
    updateCommentByPostId,
    deleteCommentByPostId,
    getCommentHasCommentedCurrentUser,
    likeCommentByCurruser,
    unlikeCommentByCurrentUser,
    getCurrUserHasLikeComment
  }
}
export default CommentService