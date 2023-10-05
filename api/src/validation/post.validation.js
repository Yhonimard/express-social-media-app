import Joi from "joi"


const createPostValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().empty().min(3).max(200).messages({
      "string.min": "username should be at least 3 character",
      "string.max": "username max at least 3 character",
      "string.empty": "username is required!!",
      "any.required": "username is required!!",
    }),
    content: Joi.string().required().empty().min(3).max(200).messages({
      "string.min": "content should be at least 3 character",
      "string.max": "content max at least 3 character",
      "string.empty": "content is required!!",
      "any.required": "content is required!!",
    }),
    image: Joi.string().required().empty().messages({
      "string.empty": "image is required!!",
      "number.min": "pageno must be at least 1",
      "any.required": "image is required!!",
    })

  })
}


const getPostValidation = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1).messages({
      "number.empty": "page no is required!!",
      "number.min": "size must be at least 1",
      "any.required": "page no is required!!",
    }),
    size: Joi.number().required().empty().min(1).messages({
      "number.empty": "size is required!!",
      "number.min": "size must be at least 1",
      "any.required": "size is required!!",
    })
  })
}

const updatePostValidation = {
  body: Joi.object().keys({
    title: Joi.string().min(3).max(200).messages({
      "string.min": "title must be at least 3 character",
      "string.max": "title must max at least 200 character",
    }),
    content: Joi.string().min(3).max(200).messages({
      "string.min": "content must be at least 3 character",
      "string.max": "content must max at least 200 character",
    })
  }),
  param: Joi.object().keys({
    postId: Joi.string().uuid().required().empty().messages({
      "string.empty": "postId is required!!",
      "any.required": "postId is required!!",
      "string.uuid": "postId must have a valid uuid"
    }),
  }),

}


const deletePostValidation = {
  param: Joi.object().keys({
    postId: Joi.string().uuid().required().empty().messages({
      "string.empty": "postId is required!!",
      "any.required": "postId is required!!",
      "string.uuid": "postId must have a valid uuid"
    })
  })
}

const updatePostByUserValidation = {
  param: Joi.object().keys({
    pid: Joi.string().uuid().required().empty().messages({
      "string.empty": "postId is required!!",
      "any.required": "postId is required!!",
      "string.uuid": "postId must have a valid uuid"
    })
  })
}

const deletePostByUserValidation = {
  param: Joi.object().keys({
    pid: Joi.string().uuid().required().empty().messages({
      "string.empty": "postId is required!!",
      "any.required": "postId is required!!",
      "string.uuid": "postId must have a valid uuid"
    })
  })
}

const createPostByUserValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().empty().min(3).max(200),
    content: Joi.string().required().empty().min(3).max(200),
    image: Joi.string().required().empty()
  })
}


export default {
  createPostValidation,
  getPostValidation,
  updatePostValidation,
  deletePostValidation,
  updatePostByUserValidation,
  deletePostByUserValidation,
  createPostByUserValidation
}