import Joi from "joi"

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().empty().uuid().guid().messages({
      "string.empty": "userId is required!!",
      "any.required": "userId is required!!",
      "string.uuid": "userId must have a valid uuid",
      "string.guid": "userId must have a valid uuid"
    })
  })
}


const updateProfile = {
  body: Joi.object().keys({
    bio: Joi.string().min(4).max(100).allow(null).optional().label("bio"),
    birthday: Joi.date().allow(null).optional().label("birthday"),
    phone: Joi.string().min(3).max(15).optional().allow(null).label("phone")
  })
}

const getUserProfileByUserId = {
  params: Joi.object().keys({
    uid: Joi.string().uuid().required().empty().label("user id"),
  })
}

export default {
  getUserById,
  updateProfile,
  getUserProfileByUserId
}