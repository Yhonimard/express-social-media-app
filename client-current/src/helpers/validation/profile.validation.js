import * as yup from "yup";

const updateProfileValidation = yup.object({
  name: yup.string().min(5).max(200).notRequired().nullable(),
  bio: yup.string().min(5).max(200).notRequired().nullable(),
  birthday: yup.date().max(new Date()).notRequired().nullable(),
  phone: yup
    .number()
    .notRequired()
    .transform((val) => (isNaN(val) ? null : val))
    .nullable(),
});

export default {
  updateProfileValidation,
};
