import { Router } from "express";
import authRoutes from "./auth.routes";
import commentRoutes from "./comment.routes";
import friendRoutes from "./friend.routes";
import postLikeRoutes from "./post-like.routes";
import postRoutes from "./post.routes";
import userRoutes from "./user.routes";

const routes = Router()
routes.use(authRoutes)
routes.use(postRoutes)
routes.use(commentRoutes)
routes.use(userRoutes)
routes.use(friendRoutes)
routes.use(postLikeRoutes)
export default routes
