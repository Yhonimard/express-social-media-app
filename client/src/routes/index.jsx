import AuthPage from "@/pages/auth"
import HomePage from "@/pages/home"
import RootPage from "@/pages/root"
import { createBrowserRouter } from "react-router-dom"
import Authorized from "@/components/auth/Authorized"
import Unauthorized from "@/components/auth/Unauthorized"
import PostDetailPage from "@/pages/postDetail"
import ProfilePage from "@/pages/profile"
import UserDetailPage from "@/pages/userDetail"
import ChatPage from "@/pages/chat"
import ChatContextProvider from "@/context/Chat.context"

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
        element: <HomePage />
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
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/user",
        children: [
          {
            path: ":userId",
            element: <UserDetailPage />
          }
        ]
      },
      {
        path: '/chat',
        element: (
          <ChatContextProvider>
            <ChatPage />
          </ChatContextProvider>
        )
      }
    ]
  },
  {
    path: "/auth",
    element: (
      <Authorized>
        <AuthPage />
      </Authorized>
    )
  }
])

export default routes
