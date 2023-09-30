import * as yup from "yup"
const createPostValidation = yup.object().shape({
  title: yup.string().min(3, "title must be at least 3 characters").max(200, "title must max at least 200 character").required("title is required"),
  content: yup.string().min(3, "content must be at least 3 characters").max(200, "content must max at least 200 character").required("content is required"),
  image: yup.mixed().required("image is required")
})

export default createPostValidation
