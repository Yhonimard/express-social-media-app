import LoginComponent from "@/components/login"
import SignupComponent from "@/components/signup"
import { Center, Container } from "@mantine/core"
import { useSearchParams } from "react-router-dom"

const AuthPage = () => {
  const [urlParam] = useSearchParams()
  const isLoginParam = urlParam.get("mode") === 'login'
  return (
    <Container size="xs" h="100vh">
      <Center h="100%">
        {isLoginParam && <LoginComponent />}
        {!isLoginParam && <SignupComponent />}
      </Center>
    </Container>
  )
}

export default AuthPage

