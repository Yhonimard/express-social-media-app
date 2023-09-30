import { Backdrop, CircularProgress, Container, Paper } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";
import { useSelector } from "react-redux";

const Auth = () => {
  const [urlSearchParam] = useSearchParams();

  const { isSendingData } = useSelector((state) => state.auth);

  const isLoginParam = urlSearchParam.get("mode") === "login";

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 3, width: "100%" }}>
        {isLoginParam && <LoginForm />}
        {!isLoginParam && <SignupForm />}
      </Paper>
      <Backdrop open={isSendingData} sx={{ color: "#fff", zIndex: 100000 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Auth;
