import Authorized from "@/components/auth/authorized";
import Unauthorized from "@/components/auth/unauthorized/Unauthorized";
import AuthPage from "@/pages/auth";
import ChatPage from "@/pages/chat";
import HomePage from "@/pages/home";
import PostDetailPage from "@/pages/postDetail";
import ProfilePage from "@/pages/profile";
import RootPage from "@/pages/root";
import UserDetailPage from "@/pages/userDetail";
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
      {
        path: "post",
        children: [
          {
            path: ":postId",
            element: <PostDetailPage />,
          },
        ],
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/user",
        children: [
          {
            path: ":uid",
            element: <UserDetailPage />,
          },
        ],
      },
      {
        path: "chat",
        element:
          (
            <Unauthorized>
              <ChatPage />
            </Unauthorized>
          ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Authorized>
        <AuthPage />
      </Authorized>
    ),
  },
]);

export default routes;
