import Joi from "joi"

const createCommentValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty().messages({
      "string.min": "title should be at least 5 character",
      "string.max": "title max at least 200 character",
      "string.empty": "title is required!!",
      "any.required": "title is required!!",
    })
  }),
  param: Joi.object().keys({
    postId: Joi.string().uuid().required().empty().messages({
      "string.empty": "postId is required!!",
      "any.required": "postId is required!!",
      "string.uuid": "postId must have a valid uuid"
    })
  })
}

const updateCommentValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty()
  }),
  params: Joi.object().keys({
    postId: Joi.string().uuid().required().empty(),
    commentId: Joi.string().uuid().required().empty(),
  })
}

const deleteCommentValidation = {
  params: Joi.object().keys({
    commentId: Joi.string().uuid().required().empty().label("comment id")
  })
}

const getCommentHasCommentedCurrentUser = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().label("page number of page"),
    size: Joi.number().required().empty().label("size of page")
  })
}

const likeCommentByCurruserValidation = {
  body: Joi.object().keys({
    commentId: Joi.string().uuid().required().empty().label("comment")
  })
}
const unlikeCommentByCurruserValidation = {
  body: Joi.object().keys({
    commentId: Joi.string().uuid().required().empty().label("comment")
  })
}

const getCurrUserHasLikeCommentValidation = {
  params: Joi.object().keys({
    cid: Joi.string().uuid().required().empty().label("comment")
  })
}

const replyComment = {
  params: Joi.object().keys({
    pid: Joi.string().uuid().required().empty().label("post "),
    cid: Joi.string().uuid().required().empty().label("comment")
  }),
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty()
  }),
}

const updateCommentReply = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty(),
    id: Joi.object({
      parentCommentId: Joi.string().required().uuid().label("parent comment"),
      replyCommentId: Joi.string().required().uuid().label("reply comment"),
      postId: Joi.string().required().uuid().label("post"),
    })
  }),
}

const deleteCommentReply = {
  body: Joi.object({
    parentCommentId: Joi.string().required().uuid().label("parent comment"),
    replyCommentId: Joi.string().required().uuid().label("reply comment"),
    postId: Joi.string().required().uuid().label("post"),
  })
}

export default {
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation,
  getCommentHasCommentedCurrentUser,
  likeCommentByCurruserValidation,
  unlikeCommentByCurruserValidation,
  getCurrUserHasLikeCommentValidation,
  replyComment,
  updateCommentReply,
  deleteCommentReply
}