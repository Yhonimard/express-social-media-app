import * as yup from "yup";
const createCommentValidation = yup.object().shape({
  title: yup.string().min(5).max(200).notRequired(),
});

export default createCommentValidation;