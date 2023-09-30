import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import userRoutes from "./user.routes";
import friendRoutes from "./friend.routes";

const routes = Router()
routes.use(authRoutes)
routes.use(postRoutes)
routes.use(commentRoutes)
routes.use(userRoutes)
routes.use(friendRoutes)
export default routes
