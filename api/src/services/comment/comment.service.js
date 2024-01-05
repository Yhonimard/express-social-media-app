import moment from "moment"
import ApiBadRequestError from "../../exceptions/ApiBadRequestError"
import ApiForbiddenError from "../../exceptions/ApiForbiddenError"
import ApiNotFoundError from "../../exceptions/ApiNotFoundError"
import sequelizeError from "../../exceptions/sequelize-error"
import { COMMENT_BELONGS_TO_PARENT_ALIAS, COMMENT_BELONGS_TO_USER_ALIAS } from "../../fixtures/models"
import paginationHelper from "../../helper/pagination-helper"
import toPaginationHelper from "../../helper/to-pagination-helper"
import {
  COMMENT_ATTRIBUTES,
  USER_ATTRIBUTES
} from "./comment.constants"

const CommentService = ({
  commentRepo,
  sequelize,
  userLikeCommentRepo,
  postRepo
}) => {

  const getComments = async (query, params) => {

    try {
      const { post_id } = params
      const { limit, offset } = paginationHelper(query)

      const comments = await commentRepo.findAndCountAll({
        where: {
          post_id,
          parent_id: null
        },
        limit,
        offset,
        attributes: COMMENT_ATTRIBUTES,
        include: [
          {
            association: COMMENT_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          }
        ],
        order: [
          ["created_at", "DESC"]
        ]
      })

      const lastId = await commentRepo.max('id')

      const mappedResults = comments.rows.map(c => ({
        ...c.get(),
        created_at: moment(c.created_at).format("DD MMMM, YYYY")
      }))

      return toPaginationHelper(mappedResults, comments.count, query, null, lastId)
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const createComment = async (data, params, user) => {
    try {
      const { post_id } = params
      const result = await sequelize.transaction(async trx => {
        const post = await postRepo.findByPk(post_id, { attributes: ['id'] })
        if (!post) throw new ApiNotFoundError("post not found")

        const newComment = await commentRepo.create({
          ...data,
          post_id: post.id,
          user_id: user.id,
          parent_id: null
        }, { transaction: trx, attributes: ['id'] })

        return newComment
      })

      return result
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const updateComment = async (data, params, user) => {
    try {
      const { id, post_id } = params
      await sequelize.transaction(async trx => {

        const post = await postRepo.findByPk(post_id, { attributes: ["id"] })
        if (!post) throw new ApiNotFoundError("post not found")

        const comment = await commentRepo.findByPk(id, {
          attributes: ['id', 'user_id']
        })

        if (!comment) throw new ApiNotFoundError("comment not found")

        if (comment.user_id !== user.id) throw new ApiForbiddenError("you cant update this user comment")

        await commentRepo.update(data, {
          where: {
            id: comment.id,
            post_id: post.id,
            user_id: user.id
          },
          transaction: trx
        })

      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const deleteComment = async (params, user) => {
    try {
      const { id, post_id } = params
      await sequelize.transaction(async trx => {
        const post = await postRepo.findByPk(post_id, { attributes: ['id'] })
        if (!post) throw new ApiNotFoundError("post not found")
        const comment = await commentRepo.findByPk(id, { attributes: ['id', 'post_id', 'user_id'] })
        if (!comment) throw new ApiNotFoundError("comment not found")

        if (comment.post_id !== post.id) throw new ApiBadRequestError("comment doesnt belong to post")
        if (comment.user_id !== user.id) throw new ApiForbiddenError("you can't delete this user post")

        await comment.destroy({
          where: {
            id: comment.id,
            post_id: post.id,
            user_id: user.id
          }
        }, { transaction: trx })
      })
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserHasLikeComment = async (params, user) => {
    try {
      const { id } = params
      const comment = await commentRepo.findByPk(id)
      if (!comment) throw new ApiNotFoundError("comment not found")
      const hasLike = await userLikeCommentRepo.findOne({
        where: {
          comment_id: id,
          user_id: user.id
        }
      })

      return Boolean(hasLike)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const likeComment = async (params, user) => {
    try {
      const { id } = params
      await sequelize.transaction(async trx => {

        const comment = await commentRepo.findByPk(id, { attributes: ['id'] })
        if (!comment) throw new ApiNotFoundError({ message: "comment not found" })

        const isHasLike = await comment.hasLikedBy(user.id)
        if (isHasLike) throw new ApiBadRequestError("you have been like this post")

        await userLikeCommentRepo.create({
          user_id: user.id,
          comment_id: comment.id
        }, { transaction: trx })
      })
    } catch (error) {
      throw sequelizeError(error)

    }
  }

  const unlikeComment = async (params, user) => {
    try {
      const { id } = params
      await sequelize.transaction(async trx => {
        const comment = await commentRepo.findByPk(id)
        if (!comment) throw new ApiNotFoundError("comment not found")

        const isHasLike = await comment.hasLikedBy(user.id)

        if (!isHasLike) throw new ApiBadRequestError("you have not like yet")

        await userLikeCommentRepo.destroy({
          where: {
            user_id: user.id,
            comment_id: comment.id
          }
        }, { transaction: trx })
      })

    } catch (error) {
      throw sequelizeError(error)
    }

  }

  const   getRepliesComment = async (query, params) => {
    try {
      const { limit, offset } = paginationHelper(query)
      const { parent_id } = params

      const repliesComment = await commentRepo.findAndCountAll({
        limit,
        offset,
        where: {
          parent_id,
        },
        order: [
          ["created_at", "ASC"]
        ],
        attributes: COMMENT_ATTRIBUTES,
        include: [
          {
            association: COMMENT_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          }
        ]
      })
      const mappedResults = repliesComment.rows.map(rc => ({
        ...rc.get(),
        created_at: moment(rc.created_at).format("DD MMMM, YYYY")
      }))

      const lastId = await commentRepo.max("id")
      return toPaginationHelper(mappedResults, repliesComment.count, query, null, lastId)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const replyComment = async (data, params, user) => {
    try {
      const { parent_id } = params
      await sequelize.transaction(async trx => {
        const parent = await commentRepo.findByPk(parent_id, { attributes: ['id', 'post_id'] })
        if (!parent) throw new ApiNotFoundError("comment not found")

        const post = await parent.getPost()
        if (!post) throw new ApiNotFoundError("post not found")


        await commentRepo.create({
          ...data,
          user_id: user.id,
          post_id: post.id,
          parent_id: parent.id
        }, { transaction: trx })
      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const getUserComment = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)

      const result = await commentRepo.findAndCountAll({
        where: {
          user_id: user.id
        },

        include: [
          {
            association: COMMENT_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          },
          {
            association: COMMENT_BELONGS_TO_PARENT_ALIAS,
            attributes: COMMENT_ATTRIBUTES,
            include: [
              {
                association: COMMENT_BELONGS_TO_USER_ALIAS,
                attributes: USER_ATTRIBUTES
              }
            ]
          },
        ],
        limit,
        offset,
        attributes: COMMENT_ATTRIBUTES
      })

      const mappedResult = result.rows.map(c => {
        if (!c.dataValues.parent) delete c.dataValues.parent

        const defaultMapped = {
          ...c.dataValues,
          created_at: moment(c.dataValues.created_at).fromNow(true)
        }


        if (c.dataValues.parent) {
          const swappedDataWithFormat = {
            ...c.dataValues.parent.dataValues,
            created_at: moment(c.dataValues.parent.dataValues.created_at).fromNow(true),
            child: defaultMapped,
          }
          delete swappedDataWithFormat.child.parent
          return swappedDataWithFormat
        }

        return { ...defaultMapped }
      })



      return toPaginationHelper(mappedResult, result.count, query)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  return {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getUserHasLikeComment,
    likeComment,
    unlikeComment,
    getRepliesComment,
    replyComment,
    getUserComment
  }
}

export default CommentService