import * as yup from "yup"
const signupValidation = yup.object().shape({
  username: yup.string().required("username is required").min(4, "username must be at least 4 character").max(100, "username must max at least 100 character"),
  password: yup.string().required("password is required").min(4, "password must be at least 4 character").max(100, "password must max at least 100 character"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "confirm password must one of the password").required("confirm password is required"),
  photoProfile: yup.mixed().required("photo profile is required")
})

export default signupValidation