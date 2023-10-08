import * as yup from "yup"
const updateProfileValidation = yup.object({
  bio: yup.string().min(5).max(200).notRequired(),
  birthday: yup.date().max(new Date()).notRequired(),
  phone: yup.number().min(1).max(13).notRequired()
})

export default {
  updateProfileValidation
}
