import { Joi, Segments } from "celebrate"

const AuthValidation = () => {

  const login = {
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required().min(5).max(100),
      password: Joi.string().required().min(5).max(100)
    })
  }

  const register = {
    body: Joi.object().keys({
      username: Joi.string().required().min(5).max(100),
      password: Joi.string().required().min(5).max(100),
    })
  }

  return {
    login,
    register
  }

}

export default AuthValidation