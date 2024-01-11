import { Router } from "express";
import docsRoutes from "./docs.routes";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import commentRoutes from "./comment.routes";
import userRoutes from "./user.routes";
import friendRoutes from "./friend.routes";
import chatRoutes from "./chat.routes";
import upload from "../../middlewares/upload";
import uploadBase64 from "../../middlewares/upload-base64";


const routes = Router()
routes.use(docsRoutes)
routes.use(authRoutes)
routes.use(postRoutes)
routes.use(commentRoutes)
routes.use(userRoutes)
routes.use(friendRoutes)
routes.use(chatRoutes)

routes.route('/test').post(upload.any(), (req, res, next) => {

  res.json('result')
})

export default routes