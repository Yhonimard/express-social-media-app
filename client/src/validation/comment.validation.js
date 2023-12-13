import * as yup from "yup"
const createComment = yup.object({
  title: yup.string().required()
})

export default {
  createComment
}