import { Router } from "express";
import CommentLikeController from "../controller/commnet-like.controller";

const routes = Router()
const controller = CommentLikeController()

routes.route("/comment/like").post(controller.likeComment)



const commentLikeRoutes = routes
export default commentLikeRoutes
