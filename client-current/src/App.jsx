import { LoadingOverlay } from "@mantine/core";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import api from "./api";
import routes from "./routes";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  api.instance.setup(user.token);

  const isOpenLoadingOverlay = useSelector(
    (state) => state.global.loadingOverlay.isOpen
  );

  return (
    <>
      <RouterProvider router={routes} />
      <LoadingOverlay
        visible={isOpenLoadingOverlay}
        overlayProps={{ zIndex: 1000, radius: "sm", blur: 2 }}
      />
    </>
  );
};

export default App;
