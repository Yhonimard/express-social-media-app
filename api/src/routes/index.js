import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import userRoutes from "./user.routes";
import friendRoutes from "./friend.routes";
import postLikeRoutes from "./post-like.routes";
import commentLikeRoutes from "./comment-like.routes";

const routes = Router()
routes.use(authRoutes)
routes.use(postRoutes)
routes.use(commentRoutes)
routes.use(userRoutes)
routes.use(friendRoutes)
routes.use(postLikeRoutes)
routes.use(commentLikeRoutes)
export default routes
