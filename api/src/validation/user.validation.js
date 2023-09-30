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

export default {
  getUserById
}