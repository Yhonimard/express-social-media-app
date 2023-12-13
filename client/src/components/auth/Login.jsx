import Icon from "@/assets/Icon"
import auth from "@/config/auth/auth"
import authValidation from "@/validation/auth.validation"
import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../PasswordInput"

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: data => {
      login(data, { onSuccess: () => navigate("/") })
    },
    validationSchema: authValidation.login
  })

  const { mutate: login } = auth.query.Login()
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="username"
        onChange={formik.handleChange}
        label="username"
        fullWidth
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon.AccountCircle />
            </InputAdornment>
          )
        }}
        variant="standard"
        value={formik.values.username}
      />
      <PasswordInput
        fullWidth={true}
        StartIcon={Icon.Key}
        name={`password`}
        id={`login-pw`}
        label={"password"}
        error={formik.errors.password}
        touched={formik.touched.password}
        handleChange={formik.handleChange}
        margin="normal"
        value={formik.values.password}
      />
      <Button fullWidth color="inherit" variant="contained" type="submit">Login</Button>
      <Typography mt={0.5}>dont have an account? <Link to={`?mode=signup`} >Signup</Link></Typography>
    </form >
  )
}

export default Login
