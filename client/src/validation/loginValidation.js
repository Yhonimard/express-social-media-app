import * as yup from "yup"

const loginSchema = yup.object().shape({
  username: yup.string().required("username is required").min(4, "username must be at least 4 character").max(100, "username must max at least 4 character"),
  password: yup.string().required("password is required").min(4, "password must be at least 4 character").max(100, "password must max at least 4 character"),
})

export default loginSchema
