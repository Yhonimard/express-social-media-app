import Joi from "joi"

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().empty()
  })
}

const updateProfile = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(100).allow(null).optional().allow('').label("name").default(''),
    bio: Joi.string().min(3).max(100).allow(null).optional().label("bio").allow("").default(''),
    birthday: Joi.date().allow(null).optional().label("birthday").default(null),
    phone: Joi.string().min(3).max(15).optional().allow(null).label("phone").default(null)
  })
}

const getUserProfileByUserId = {
  params: Joi.object().keys({
    uid: Joi.string().required().empty().label("user id"),
  })
}

const searchUser = {
  query: Joi.object().keys({
    pageNo: Joi.number().required().empty().default(1).label("page number"),
    size: Joi.number().required().empty().default(4).label("size of page"),
    search: Joi.string().allow("").required().default("")
  })
}


export default {
  getUserById,
  updateProfile,
  getUserProfileByUserId,
  searchUser
}