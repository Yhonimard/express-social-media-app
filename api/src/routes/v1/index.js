import { Router } from "express";
import docsRoutes from "./docs.routes";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import userRoutes from "./user.routes";
import friendRoutes from "./friend.routes";
import chatRoutes from "./chat.routes";

const routes = Router()
routes.use(docsRoutes)
routes.use(authRoutes)
routes.use(postRoutes)
routes.use(commentRoutes)
routes.use(userRoutes)
routes.use(friendRoutes)
routes.use(chatRoutes)

export default routes