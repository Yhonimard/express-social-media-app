import useRegister from '@/features/auth/useRegister'
import usePreviewImg from '@/hooks/usePreviewImg'
import { Anchor, Avatar, Button, Fieldset, FileInput, Group, PasswordInput, TextInput } from '@mantine/core'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from "yup"


const SignupComponent = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      photoProfile: ""
    },
    validationSchema: yup.object({
      username: yup.string().required().min(5).max(100),
      password: yup.string().required().min(5).max(100),
      confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
      photoProfile: yup.mixed().required()
    }),
    onSubmit: (data) => {
      register(data)
    }
  })

  const { mutate: register } = useRegister(formik.handleReset)


  const previewImg = usePreviewImg(formik.values.photoProfile)

  return (
    <Fieldset legend="signup" w="100%" >
      <form onSubmit={formik.handleSubmit}>
        <TextInput label="username" placeholder="username" name="username" onChange={formik.handleChange} error={formik.touched.username && formik.errors.username} value={formik.values.username} />
        <PasswordInput label="password" placeholder="password" name="password" onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} value={formik.values.password} />
        <PasswordInput label="confirm password" placeholder="confirm password" name="confirmPassword" onChange={formik.handleChange} error={formik.touched.confirmPassword && formik.errors.confirmPassword} value={formik.values.confirmPassword} />
        <Group mt={`md`}>
          <FileInput styles={{ root: { flexGrow: 1 } }} onChange={(e) => formik.setFieldValue("photoProfile", e)} />
          <Avatar size={`md`} src={previewImg} />
        </Group>
        <Button mt={`md`} fullWidth type="submit">Signup</Button>
        <Anchor mt={`sm`} component={Link} to={`?mode=login`}>have an account?</Anchor>
      </form>
    </Fieldset>
  )
}

export default SignupComponent