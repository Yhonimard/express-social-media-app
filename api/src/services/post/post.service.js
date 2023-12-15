import moment from "moment"
import ApiBadRequestError from "../../exceptions/ApiBadRequestError"
import ApiConflictError from "../../exceptions/ApiConflictError"
import ApiForbiddenError from "../../exceptions/ApiForbiddenError"
import ApiNotFoundError from "../../exceptions/ApiNotFoundError"
import sequelizeError from "../../exceptions/sequelize-error"
import { POST_BELONGS_TO_MANY_USER_LIKE_ALIAS, POST_BELONGS_TO_USER_ALIAS, USER_LIKE_POST_BELONGS_TO_POST_ALIAS } from "../../fixtures/models"
import paginationHelper from "../../helper/pagination-helper"
import toPaginationHelper from "../../helper/to-pagination-helper"
import deleteFileHelper from "../../middlewares/delete-file-helper"
import { POST_ATTRIBUTES, USER_ATTRIBUTES } from "./post.constants"
import { Op, Sequelize } from "sequelize"
import _ from "lodash"
import shuffleAndPaginateDataHelper from "../../helper/shuffle-and-paginate-data-helper"

const PostService = ({
  postRepo,
  sequelize,
  userLikePostRepo,
  userRepo
}) => {

  const getPosts = async (query) => {
    try {

      const posts = await postRepo.findAll({
        attributes: POST_ATTRIBUTES,
        include: [
          {
            association: POST_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          }
        ],
      })

      const mapped = await Promise.all(posts.map(async p => ({
        ...p.dataValues,
        created_at: moment(p.created_at).format("DD MMMM, YYYY")
      })))


      return shuffleAndPaginateDataHelper(mapped, query)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const createPost = async (currentUser, data) => {
    try {
      const { title, content, image } = data

      const result = await sequelize.transaction(async trx => {
        const newPost = await postRepo.create({
          title,
          content,
          image,
          user_id: currentUser.id
        }, { transaction: trx })

        const post = await postRepo.findByPk(newPost.id, {
          attributes: POST_ATTRIBUTES,
          include: [
            {
              association: POST_BELONGS_TO_USER_ALIAS,
              attributes: USER_ATTRIBUTES
            }
          ],
          transaction: trx
        })

        return post
      })

      return result
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const deletePost = async (currentUser, params) => {
    try {
      const { id } = params
      const result = await sequelize.transaction(async trx => {

        const post = await postRepo.findByPk(id, {
          transaction: trx
        })
        if (!post) throw new ApiNotFoundError("post not found")
        if (post.user_id !== currentUser.id) throw new ApiForbiddenError("you can't delete this user post")

        await postRepo.destroy({
          where: {
            id
          },
          transaction: trx
        })
        if (!post.image.startsWith("storage/img_seed")) {
          deleteFileHelper.single(post.image)
        }
      })
      return result
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const updatePost = async (currentUser, data, params) => {
    try {
      const { id } = params
      await sequelize.transaction(async trx => {

        const post = await postRepo.findByPk(id, { transaction: trx })
        if (!post) throw new ApiNotFoundError("post not found")

        if (post.user_id !== currentUser.id) throw new ApiForbiddenError("you can't update this user post")

        await postRepo.update(data, {
          where: { id },
          transaction: trx
        })
      })

    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getPostDetail = async (params) => {
    try {
      const { id } = params
      const post = await postRepo.findByPk(id, {
        attributes: POST_ATTRIBUTES,
        include: [
          {
            association: POST_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          }
        ]
      })

      const mappedResult = {
        ...post.get(),
        created_at: moment(post.created_at).format("DD MMMM, YYYY")
      }

      return mappedResult
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserHasLikePost = async (currentUser, params) => {
    try {
      const { id: post_id } = params
      const userHasLike = await userLikePostRepo.findOne({
        where: {
          user_id: currentUser.id,
          post_id
        }
      })
      return Boolean(userHasLike)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const likePost = async (currentUser, params) => {
    try {
      const { id: post_id } = params
      await sequelize.transaction(async trx => {
        const post = await postRepo.findByPk(post_id, { attributes: ['id'] })
        if (!post) throw new ApiNotFoundError("post not found")

        const isHasLikeUser = await post.hasLikedBy(currentUser.id)
        if (isHasLikeUser) throw new ApiConflictError("you have been like this user")

        await userLikePostRepo.create({
          post_id: post.id,
          user_id: currentUser.id
        }, { transaction: trx })
      })
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const unlikePost = async (currentUser, params) => {
    try {
      const { id: post_id } = params

      await sequelize.transaction(async trx => {
        const post = await postRepo.findByPk(post_id, { attributes: ["id"] })

        if (!post) throw new ApiConflictError("post not found")

        const isHasLikeUser = await post.hasLikedBy(currentUser.id)
        if (!isHasLikeUser) throw new ApiBadRequestError('you have not like yet')

        await userLikePostRepo.destroy({
          where: {
            post_id: post.id,
            user_id: currentUser.id
          }
        }, { transaction: trx })
      })
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getCurrentUserPosts = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)
      const result = await postRepo.findAndCountAll({
        where: {
          user_id: user.id,
        },
        limit,
        offset,
        attributes: POST_ATTRIBUTES,
        include: [{
          association: POST_BELONGS_TO_USER_ALIAS,
          attributes: USER_ATTRIBUTES
        }],
      })


      const mappedPosts = result.rows.map(p => ({
        ...p.dataValues,
        created_at: moment(p.dataValues.created_at).format("DD MMMM, YYYY")
      }))

      const lastId = await postRepo.max("id")

      return toPaginationHelper(mappedPosts, result.count, query, null, lastId)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getPostsByUserId = async (params, query) => {
    try {
      const { user_id } = params
      const { limit, offset } = paginationHelper(query)

      const user = await userRepo.findByPk(user_id)
      if (!user) throw new ApiNotFoundError('user not found')

      const posts = await postRepo.findAndCountAll({
        where: {
          user_id
        },
        limit,
        offset,
        attributes: POST_ATTRIBUTES,
        include: [
          {
            association: POST_BELONGS_TO_USER_ALIAS,
            attributes: USER_ATTRIBUTES
          }
        ]
      })

      const mappedPosts = posts.rows.map(p => ({
        ...p.dataValues,
        created_at: moment(p.dataValues.created_at).format('DD MMMM, YYYY')
      }))

      return toPaginationHelper(mappedPosts, posts.count, query)
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getPostLikedUser = async (user, query) => {
    try {
      const { limit, offset } = paginationHelper(query)


      const result = await postRepo.findAndCountAll({
        include: [
          {
            association: POST_BELONGS_TO_MANY_USER_LIKE_ALIAS,
            attributes: ['id'],
            through: {
              attributes: ['created_at'],
              as: "user_like_post"
            },
            where: {
              id: user.id
            },

          },
          {
            association: POST_BELONGS_TO_USER_ALIAS,
            attributes: ['username']
          }
        ],
        attributes: ['id', 'title', 'image'],
        limit,
        offset
      })

      return toPaginationHelper(result.rows, result.count, query)
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  const searchPost = async (query) => {
    try {
      const { limit, offset } = paginationHelper(query)

      let searchPost = {}

      if (query.search) {
        searchPost = {
          [Op.or]: [
            {
              title: {
                [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
              }
            },
            {
              content: {
                [Op.match]: Sequelize.fn('to_tsquery', `'${query.search}'`)
              }
            }
          ]
        }
      }

      const result = await postRepo.findAndCountAll({
        where: {
          ...searchPost
        },
        attributes: ['id', 'title', 'content', 'image'],
        limit,
        offset
      })

      return toPaginationHelper(result.rows, result.count, query, 'posts')
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getCurrentUserTotalPosts = async (user) => {
    try {
      const result = await postRepo.count({
        where: {
          user_id: user.id
        }
      })
      return result
    } catch (error) {
      throw sequelizeError(error)
    }
  }

  const getUserTotalPost = async (params) => {
    try {
      const { id: user_id } = params
      const user = await userRepo.findByPk(user_id)
      if (!user) throw new ApiNotFoundError('user not found')

      const result = await postRepo.count({
        where: {
          user_id
        }
      })

      return result
    } catch (error) {
      throw sequelizeError(error)
    }
  }


  return {
    getPosts,
    createPost,
    deletePost,
    updatePost,
    getPostDetail,
    getUserHasLikePost,
    likePost,
    unlikePost,
    getCurrentUserPosts,
    getPostsByUserId,
    getPostLikedUser,
    searchPost,
    getCurrentUserTotalPosts,
    getUserTotalPost
  }
}

export default PostService