import useRegister from "@/features/auth/useRegister";
import { AccountCircle, Key, Password } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupValidation from "../../validation/signupValidation";
import InputFile from "../inputFile/InputFile";
import AuthInput from "./AuthInput";

const SignupForm = () => {
  const [photoProfile, setPhotoProfile] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      photoProfile: "",
    },
    validationSchema: signupValidation,
    onSubmit: (data) => {
      registerUser(data)
    },
  });

  if (formik.values.photoProfile) {
    const reader = new FileReader();
    reader.readAsDataURL(formik.values.photoProfile);
    reader.onload = () => {
      setPhotoProfile(reader.result);
    };
  }

  const { mutate: registerUser, isSuccess } = useRegister()
  if (isSuccess) navigate('/')

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
        type="password"
        name="password"
        touched={formik.touched.password}
        value={formik.values.password}
      >
        <Password />
      </AuthInput>
      <AuthInput
        errorMsg={formik.errors.confirmPassword}
        handleChange={formik.handleChange}
        type="password"
        label="confirm password"
        name="confirmPassword"
        touched={formik.touched.confirmPassword}
        value={formik.values.confirmPassword}
      >
        <Key />
      </AuthInput>
      <Stack direction="row" my={1} gap={5} justifyContent="space-around">
        <InputFile
          id={"photo-profile"}
          name="photoProfile"
          setFieldValue={formik.setFieldValue}
        >
          <Button color="inherit">upload image</Button>
        </InputFile>
        <Avatar src={photoProfile} sx={{ width: 35, height: 35 }} />
      </Stack>
      <Box>
        <Button fullWidth variant="outlined" color="inherit" type="submit">
          signup
        </Button>
        <Typography variant="body2" mt={0.5}>
          have an account? <Link to="?mode=login">login</Link>
        </Typography>
      </Box>
    </form>
  );
};

export default SignupForm;
