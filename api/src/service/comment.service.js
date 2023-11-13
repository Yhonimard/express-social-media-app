import httpStatus from "http-status"
import db from "../config/db"
import ApiErrorResponse from "../exception/ApiErrorResponse"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"
import paginationHelper from "../helper/pagination.helper"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import ApiForbiddenError from "../exception/ApiForbiddenError"
import toPaginationResponseHelper from "../helper/to-pagination-response.helper"
import moment from "moment/moment"

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

  const getCommentByPostId = async (postId, query) => {
    try {

      const { skip, take } = paginationHelper(query.pageNo, query.size)

      const post = await postRepo.findUnique({
        where: {
          id: postId
        }
      })
      if (!post) throw new ApiNotFoundError("post not found")

      const comments = await commentRepo.findMany({
        where: {
          postId: postId,
          parentCommentId: null
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

      const commentsCount = await commentRepo.count({
        where: {
          postId,
          parentCommentId: null
        }
      })
      return toPaginationResponseHelper(commentsCount, comments, query)
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

  const getAllReplyCommentByCid = async (params, query) => {
    try {
      const { skip, take } = paginationHelper(query.pageNo, query.size)

      const replyComments = await commentRepo.findMany({
        where: {
          parentComment: {
            id: params.cid
          }
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
        skip,
        take
      })

      const mapperReplyComments = replyComments.map(rp => ({
        id: rp.id,
        createdAt: moment(rp.createdAt).format("DD MMMM, YYYY"),
        title: rp.title,
        author: {
          id: rp.author.id,
          username: rp.author.username,
          photoProfile: rp.author.photoProfile,
        }
      }))

      const replyCommentsCount = await commentRepo.count({
        where: {
          parentComment: {
            id: params.cid
          }
        },
      })

      return toPaginationResponseHelper(replyCommentsCount, mapperReplyComments, query)
    } catch (error) {
      throw prismaError(error)
    }
  }

  const replyComment = async (currentUser, params, data) => {
    try {
      await db.$transaction(async trx => {

        await trx.comment.create({
          data: {
            title: data.title,
            parentComment: {
              connect: {
                id: params.cid,
              }
            },
            author: {
              connect: {
                id: currentUser.userId
              }
            },
            post: {
              connect: {
                id: params.pid
              }
            },
          }
        })

      })

    } catch (error) {
      throw prismaError(error)
    }
  }

  const updateCommentReply = async (currentUser, data) => {
    try {

      await db.$transaction(async tr => {
        const existingPost = await tr.post.findUniqueOrThrow({
          where: {
            id: data.id.postId
          }
        })

        const existingParentComment = await tr.comment.findUnique({
          where: {
            id: data.id.parentCommentId,
            parentCommentId: null,
          }
        })
        if (!existingParentComment) throw new ApiNotFoundError("comment you replied not found")

        const existingReplyComment = await tr.comment.findUnique({
          where: {
            id: data.id.replyCommentId,
            parentComment: {
              id: data.id.parentCommentId
            },
          }
        })

        if (existingPost.id !== existingReplyComment.postId || existingPost.id !== existingParentComment.postId) throw new ApiBadRequestError("comment doesnt belong to post")

        if (currentUser.userId !== existingReplyComment.authorId) throw new ApiForbiddenError("you cant update this user comment")

        await tr.comment.update({
          where: {
            id: data.id.replyCommentId,
            parentComment: {
              id: data.id.parentCommentId,
            },
            author: {
              id: currentUser.userId
            },
            post: {
              id: data.id.postId
            }
          },
          data: {
            title: data.title
          }
        })
      })

    } catch (error) {
      throw prismaError(error)
    }
  }

  const deleteReplyComment = async (currentUser, data) => {
    try {

      await db.$transaction(async tr => {

        const existingPost = await tr.post.findUniqueOrThrow({
          where: {
            id: data.postId,
          }
        })

        const existingParentComment = await tr.comment.findUnique({
          where: {
            id: data.parentCommentId,
            parentCommentId: null
          }
        })
        if (!existingParentComment) throw new ApiBadRequestError("you cant delete this comment")

        const existingReplyComment = await tr.comment.findUnique({
          where: {
            id: data.replyCommentId,
            parentComment: {
              id: data.parentCommentId
            }
          }
        })
        if (!existingParentComment) throw new ApiNotFoundError("comment not found")

        if (existingPost.id !== existingReplyComment.postId || existingPost.id !== existingParentComment.postId) throw new ApiBadRequestError("comment doesnt belong to post")

        if (currentUser.userId !== existingReplyComment.authorId) throw new ApiForbiddenError("you cant delete this user comment")

        await tr.comment.delete({
          where: {
            id: data.replyCommentId,
            author: {
              id: currentUser.userId
            },
            parentComment: {
              id: data.parentCommentId
            },
            post: {
              id: data.postId
            }
          }
        })

      })

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
    getCurrUserHasLikeComment,
    getAllReplyCommentByCid,
    replyComment,
    updateCommentReply,
    deleteReplyComment
  }
}
export default CommentService