import AuthorizedComponent from "@/components/authorized";
import UnauthorizedComponent from "@/components/unauthorized";
import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth";
import HomePage from "../pages/home";
import Root from "../pages/root/Root";
import PostDetailPage from "@/pages/postDetail";
import ProfileDetailPage from "@/pages/profileDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UnauthorizedComponent>
        <Root />
      </UnauthorizedComponent>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "post",
        children: [
          {
            path: ":postId",
            element: <PostDetailPage />
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: ":userId",
            element: <ProfileDetailPage />
          }
        ]
      }
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthorizedComponent>
        <AuthPage />,
      </AuthorizedComponent>
    ),
  },
]);

export default router;
