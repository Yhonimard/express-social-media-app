import Joi from "joi"

const createCommentValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty()
  }),
  params: Joi.object().keys({
    postId: Joi.string().required()
  })
}

const updateCommentValidation = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty()
  }),
  params: Joi.object().keys({
    postId: Joi.string().required().empty(),
    commentId: Joi.string().required().empty(),
  })
}

const deleteCommentValidation = {
  params: Joi.object().keys({
    commentId: Joi.string().required().empty()
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
    commentId: Joi.string().required().empty().label("comment")
  })
}
const unlikeCommentByCurruserValidation = {
  body: Joi.object().keys({
    commentId: Joi.string().required().empty().label("comment")
  })
}

const getCurrUserHasLikeCommentValidation = {
  params: Joi.object().keys({
    cid: Joi.string().required().empty().label("comment")
  })
}

const replyComment = {
  params: Joi.object().keys({
    pid: Joi.string().required().empty().label("post "),
    cid: Joi.string().required().empty().label("comment")
  }),
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty()
  }),
}

const updateCommentReply = {
  body: Joi.object().keys({
    title: Joi.string().max(200).required().empty(),
    id: Joi.object({
      parentCommentId: Joi.string().required().label("parent comment"),
      replyCommentId: Joi.string().required().label("reply comment"),
      postId: Joi.string().required().label("post"),
    })
  }),
}

const deleteCommentReply = {
  body: Joi.object({
    parentCommentId: Joi.string().required().label("parent comment"),
    replyCommentId: Joi.string().required().label("reply comment"),
    postId: Joi.string().required().label("post"),
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