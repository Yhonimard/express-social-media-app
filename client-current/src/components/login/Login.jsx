import { Anchor, Button, Fieldset, PasswordInput, TextInput } from "@mantine/core"
import * as yup from "yup"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import useLogin from "@/features/auth/useLogin"

const LoginComponent = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: yup.object({
      username: yup.string().min(5).max(100).required(),
      password: yup.string().min(5).max(100).required()
    }),
    onSubmit: (data) => {
      login(data)
    }
  })
  const { mutate: login } = useLogin(formik.handleReset)

  return (
    <Fieldset legend="login" w="100%" >
      <form onSubmit={formik.handleSubmit}>
        <TextInput label="username" placeholder="username" name="username" onChange={formik.handleChange} error={formik.touched.username && formik.errors.username} value={formik.values.username} />
        <PasswordInput label="password" placeholder="password" name="password" onChange={formik.handleChange} error={formik.touched.password && formik.errors.password} value={formik.values.password} />
        <Button mt={`md`} fullWidth type="submit">Login</Button>
        <Anchor mt={`sm`} component={Link} to={`?mode=register`}>dont have an account?</Anchor>
      </form>
    </Fieldset>
  )
}

export default LoginComponent