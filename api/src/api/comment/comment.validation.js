import { Joi } from "celebrate"

const CommentValidation = () => {

  const getComments = {
    query: Joi.object().keys({

      pageNo: Joi.number().required().min(1).default(1),
      size: Joi.number().required().min(1).default(4),
    }),
    params: Joi.object().keys({
      post_id: Joi.number().required()
    })
  }


  const createComment = {
    params: Joi.object().keys({
      post_id: Joi.number().required()
    }),
    body: Joi.object().keys({
      title: Joi.string().required().min(1)
    })
  }



  const updateComment = {
    body: Joi.object().keys({
      title: Joi.string().required().allow("")
    }),
    params: Joi.object().keys({
      id: Joi.number().required(),
      post_id: Joi.number().required()
    })
  }


  const getRepliesComment = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1).default(1),
      size: Joi.number().required().min(1).default(4),
    }),
    params: Joi.object().keys({
      parent_id: Joi.number().required()
    })
  }

  const deleteComment = {
    params: Joi.object().keys({
      id: Joi.number().required(),
      post_id: Joi.number().required()
    })
  }

  const getUserHasLikeComment = {
    params: Joi.object().keys({
      id: Joi.number().required(),
    })
  }

  const likeComment = {
    params: Joi.object().keys({
      id: Joi.number().required(),
    })
  }

  const unlikeComment = {
    params: Joi.object().keys({
      id: Joi.number().required(),
    })
  }

  const replyComment = {
    params: Joi.object().keys({
      parent_id: Joi.number().required(),
    }),
    body: Joi.object().keys({
      title: Joi.string().min(1).max(100).required()
    })
  }


  return {
    getComments,
    createComment,
    getRepliesComment,
    updateComment,
    deleteComment,
    getUserHasLikeComment,
    likeComment,
    unlikeComment,
    replyComment
  }
}

export default CommentValidation