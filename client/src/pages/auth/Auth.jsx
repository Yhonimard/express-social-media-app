import Login from "@/components/auth/Login"
import Signup from "@/components/auth/Signup"
import { Container, Paper, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const AuthPage = () => {
  const [searchParams] = useSearchParams("")
  const loginParam = searchParams.get("mode") === "login"

  return (
    <Container sx={{ minHeight: "100vh", justifyContent: "center", alignItems: "center", display: "flex" }} maxWidth="sm">
      <Paper sx={{ width: "100%", px: 4, py: 3 }} >
        <Typography variant="h5" textAlign={`center`}>{loginParam ? "Login" : "Signup"}</Typography>
        {loginParam && <Login />}
        {!loginParam && <Signup />}
      </Paper>
    </Container>
  )
}

export default AuthPage
