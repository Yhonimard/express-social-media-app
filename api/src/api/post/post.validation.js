import { Joi } from "celebrate";

const PostValidation = () => {
  const getPosts = {
    query: Joi.object().keys({
      pageNo: Joi.number().min(1).required().default(1),
      size: Joi.number().min(1).required().default(4)
    })
  }

  const createPost = {
    body: Joi.object().keys({
      title: Joi.string().required().min(3).max(200),
      content: Joi.string().required().min(3).max(200)
    })
  }

  const deletePost = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const updatePost = {
    params: Joi.object().keys({
      id: Joi.number().required()
    }),
    body: Joi.object().keys({
      title: Joi.string().min(3).max(200).required(),
      content: Joi.string().min(3).max(200).required()
    }),
  }

  const getPostDetail = {
    params: Joi.object().keys({
      id: Joi.number().required()
    }),
  }

  const getUserHasLikePost = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const likePost = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const unlikePost = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const getCurrentUserPosts = {
    query: Joi.object().keys({
      pageNo: Joi.number().min(1).required().default(1),
      size: Joi.number().min(1).required().default(4)
    })
  }



  const getPostsByUserId = {
    query: Joi.object().keys({
      pageNo: Joi.number().min(1).required().default(1),
      size: Joi.number().min(1).required().default(4)
    }),
    params: Joi.object().keys({
      user_id: Joi.number().required()
    })
  }

  
  const searchPost = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1).default(1),
      size: Joi.number().required().min(1).default(4),
      search: Joi.string().required().allow('')
    })
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
    searchPost
  }
}

export default PostValidation