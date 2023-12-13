import Joi from "joi"


const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required().empty().min(3).max(200),
    content: Joi.string().required().empty().min(3).max(200),
  })
}


const getAllPost = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().min(1).default(1),
    size: Joi.number().required().empty().min(1).default(4)
  })
}

const updatePost = {
  body: Joi.object().keys({
    title: Joi.string().required().max(200),
    content: Joi.string().required().max(200)
  }),
  params: Joi.object().keys({
    postId: Joi.string().required().empty()
  }),

}


const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().empty()
  })
}

const updatePostByUser = {
  params: Joi.object().keys({
    pid: Joi.string().required().empty()
  })
}

const deletePostByUser = {
  params: Joi.object().keys({
    pid: Joi.string().required().empty()
  })
}

const createPostByUser = {
  body: Joi.object().keys({
    title: Joi.string().required().empty().min(3).max(200),
    content: Joi.string().required().empty().min(3).max(200),
  })
}

const getAllPostByCurrentUser = {
  params: Joi.object().keys({
    uid: Joi.string().required().empty().label("user id"),
  }),
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().label("page number"),
    size: Joi.number().required().empty().label("size of page"),
  }),

}

const getAllPostHasLikedCurrentUser = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().default(1).label("page number"),
    size: Joi.number().required().empty().default(4).label("size of page"),
  }),
}

const getPostByAuthorId = {
  params: Joi.object().keys({
    uid: Joi.string().required()
  }),
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().default(1).label("page number"),
    size: Joi.number().required().empty().default(4).label("size of page"),
  }),
}

const searchPost = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().default(1).label("page number"),
    size: Joi.number().required().empty().default(4).label("size of page"),
    search: Joi.string().allow("").required()
  }),
}

export default {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  updatePostByUser,
  deletePostByUser,
  createPostByUser,
  getAllPostByCurrentUser,
  getAllPostHasLikedCurrentUser,
  getPostByAuthorId,
  searchPost
}
