import { useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom"
import api from "./api"
import LoadingOverlay from "./components/loadingOverlay/LoadingOverlay"
import routes from "./routes"

const App = () => {
  const isOpenLoadingOverlay = useSelector(s => s.global.isOpenLoadingOverlay)
  const token = useSelector(s => s.auth.user.token)
  api.instance.setup(token)

  return (
    <>
      {isOpenLoadingOverlay && <LoadingOverlay />}
      {!isOpenLoadingOverlay && (
        <RouterProvider router={routes} />
      )}
    </>
  )

}

export default App
