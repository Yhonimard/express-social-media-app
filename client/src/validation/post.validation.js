import * as yup from "yup"

const createPost = yup.object({
  title: yup.string().required().min(3).max(200),
  content: yup.string().required().min(3).max(200),
  image: yup.mixed().required()
})

const updatePost = yup.object({
  title: yup.string().required().max(200),
  content: yup.string().required().max(200),
})


export default {
  createPost,
  updatePost
}
