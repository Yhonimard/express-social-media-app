import { Segments } from "celebrate"
import Joi from "joi"

const registerUser = {
  body: Joi.object().keys({
    username: Joi.string().required().empty().min(5).max(200),
    password: Joi.string().required().empty().min(5).max(200),
  })
}

const loginUser = {
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required().empty().min(5).max(200).messages({
      "string.min": "username should be at least 5 character",
      "string.max": "username max at least 200 character",
      "string.empty": "username is required!!",
      "any.required": "username is required!!",
    }),
    password: Joi.string().required().empty().min(5).max(200).messages({
      "string.min": "password should be at least 5 character",
      "string.max": "password max at least 200 character",
      "string.empty": "password is required!!",
      "any.required": "password is required!!",
    }),

  })
}


export default {
  registerUser,
  loginUser
}
