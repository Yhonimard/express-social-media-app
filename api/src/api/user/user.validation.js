import { Joi } from "celebrate"

const UserValidation = () => {

  const getUserById = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const getProfileUserById = {
    params: Joi.object().keys({
      id: Joi.number().required()
    })
  }

  const updateProfile = {
    body: Joi.object().keys({
      name: Joi.string().allow(null).allow("").min(3),
      bio: Joi.string().allow(null).allow("").min(3).max(200),
      phone: Joi.string().min(3).max(20).allow(null).allow(""),
      birthday: Joi.date()
    })
  }

  const searchUser = {
    query: Joi.object().keys({
      pageNo: Joi.number().required().min(1).default(1),
      size: Joi.number().required().min(1).default(4),
      search: Joi.string().allow('').allow(null)
    })
  }

  return {
    getUserById,
    getProfileUserById,
    updateProfile,
    searchUser
  }
}

export default UserValidation