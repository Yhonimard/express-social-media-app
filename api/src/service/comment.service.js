import db from "../config/db"
import ApiNotFoundError from "../exception/ApiNotFoundError"
import prismaError from "../exception/prisma-error"
import paginationHelper from "../helper/pagination.helper"

const CommentService = () => {
  const userRepo = db.user
  const postRepo = db.post
  const commentRepo = db.comment

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
      })
      if (!comments) throw new ApiNotFoundError("post not found")

      const totalData = await commentRepo.count({
        where: {
          postId
        }
      })
      const totalPages = Math.ceil(totalData / size)
      const currentPageData = comments.length
      const isLast = pageNo === totalPages

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


  return {
    createComment,
    getCommentByPostId
  }
}
export default CommentService