import Authorized from "@/components/authorized/Authorized";
import Unauthorized from "@/components/unauthorized/Unauthorized";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home";
import RootPage from "@/pages/root";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Unauthorized>
        <RootPage />
      </Unauthorized>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Authorized>
        <AuthPage />
      </Authorized>
    )
  }
]);

export default routes;
