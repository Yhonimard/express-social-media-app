import Joi from "joi"

const likePost = {
  params: Joi.object().keys({
    pid: Joi.string().required()
  })
}
const unlikePost = {
  params: Joi.object().keys({
    pid: Joi.string().required()
  })
}

const getUserHasLikeByCurrentUser = {
  params: Joi.object().keys({
    pid: Joi.string().required()
  })
}


export default {
  likePost,
  unlikePost,
  getUserHasLikeByCurrentUser
}