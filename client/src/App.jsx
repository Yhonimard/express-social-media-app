import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import api from "./api";
import router from "./routes";

const App = () => {
  const token = useSelector((state) => state?.auth?.data?.token);
  const backdrop = useSelector(state => state.global.backdrop)
  api.setup(token);

  return (
    <>
      <Backdrop open={backdrop?.open} sx={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>
      <RouterProvider router={router} />
    </>
  )
};

export default App;
