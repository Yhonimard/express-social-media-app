import Icon from "@/assets/Icon"
import auth from "@/config/auth/auth"
import usePreviewImg from "@/hooks/usePreviewImg"
import authValidation from "@/validation/auth.validation"
import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { MuiFileInput } from "mui-file-input"
import Image from "mui-image"
import { Link } from "react-router-dom"
import PasswordInput from "../PasswordInput"

const Signup = () => {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      photo_profile: ""
    },
    validationSchema: authValidation.signup,
    onSubmit: data => {
      signup(data)
    }
  })

  const previewImg = usePreviewImg(formik.values.photo_profile)

  const { mutate: signup } = auth.query.Register()

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="username"
        onChange={formik.handleChange}
        label="username"
        margin="dense"
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
        margin="dense"
        error={formik.errors.password}
        touched={formik.touched.password}
        handleChange={formik.handleChange}
        value={formik.values.password}
      />
      <PasswordInput
        fullWidth={true}
        StartIcon={Icon.Key}
        name={`confirmPassword`}
        margin="dense"
        id={`login-pw`}
        label={"confirm password"}
        error={formik.errors.confirmPassword}
        touched={formik.touched.confirmPassword}
        handleChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />

      {previewImg && (
        <Image src={previewImg} style={{ aspectRatio: "16/9" }} duration={400} showLoading errorIcon />
      )}
      <MuiFileInput
        name="photo_profile"
        variant="standard"
        onChange={(e) => formik.setFieldValue("photo_profile", e)}
        error={formik.touched.photo_profile && Boolean(formik.errors.photo_profile)}
        helperText={formik.touched.photo_profile && formik.errors.photo_profile}
        label="photo profile"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"> <Icon.Image /> </InputAdornment>
          )
        }}
      />

      <Button fullWidth color="inherit" variant="contained" type="submit">Signup</Button>
      <Typography mt={0.5}>have an account? <Link to={`?mode=login`} >Login</Link></Typography>

    </form>

  )
}

export default Signup
