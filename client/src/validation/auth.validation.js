import * as yup from "yup"

const login = yup.object({
  username: yup.string().required().min(5).max(100),
  password: yup.string().required().min(5).max(100)
})

const signup = yup.object({
  username: yup.string().required().min(5).max(100),
  password: yup.string().required().min(5).max(100),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required(),
  photo_profile: yup.mixed().required()
})


export default {
  login,
  signup
}

