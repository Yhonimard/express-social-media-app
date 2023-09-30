import useLogin from "@/features/auth/useLogin";
import { AccountCircle, Password } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../../validation/loginValidation";
import AuthInput from "./AuthInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (data) => {
      loginUser(data)
    },
  });

  const { mutate: loginUser, isSuccess } = useLogin()
  if (isSuccess) navigate("/")

  return (
    <form onSubmit={formik.handleSubmit}>
      <AuthInput
        errorMsg={formik.errors.username}
        handleChange={formik.handleChange}
        label="username"
        name="username"
        touched={formik.touched.username}
        value={formik.values.username}
      >
        <AccountCircle />
      </AuthInput>

      <AuthInput
        errorMsg={formik.errors.password}
        handleChange={formik.handleChange}
        label="password"
        name="password"
        touched={formik.touched.password}
        value={formik.values.password}
        type="password"
      >
        <Password />
      </AuthInput>
      <Button
        type="submit"
        fullWidth
        sx={{ mt: 1 }}
        color="inherit"
        variant="outlined"
      >
        Submit
      </Button>
      <Typography mt={0.5} variant="body2">
        dont have an account? <Link to="?mode=signup">signup</Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
