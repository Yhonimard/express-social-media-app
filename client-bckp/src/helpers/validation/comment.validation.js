import * as yup from "yup"

const createComment = yup.object({
  title: yup.string().required("you can't create comment with empty comment").max(200),
})

const updateComment = yup.object({
  title: yup.string().required("you can't update comment with empty comment").max(200),
})

export default {
  createComment,
  updateComment
}
