import * as yup from "yup"
const createPostValidation = yup.object({
  title: yup.string().required().min(5).max(200),
  content: yup.string().required().min(5).max(200),
  image: yup.string().required().min(5).max(200)
})

export default {
  createPostValidation
}
