import * as yup from "yup";

const updateProfileValidation = yup.object({
  bio: yup.string().min(5).max(200).notRequired(),
  birthday: yup.date().max(new Date()).notRequired(),
  phone: yup
    .number()
    .notRequired()
    .transform((val) => (isNaN(val) ? null : val))
    .nullable(),
});

export default {
  updateProfileValidation,
};
