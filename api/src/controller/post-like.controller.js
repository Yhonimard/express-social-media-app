import httpStatus from "http-status";
import PostLikeService from "../service/post-like.service";

const PostLikeController = () => {
  const postLikeService = PostLikeService();

  const likePost = async (req, res, next) => {
    const { params, user: currUser } = req;
    try {
      const response = await postLikeService.likePost(currUser, params?.pid);
      res
        .status(httpStatus.CREATED)
        .json({ message: "success like post", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const unlikePost = async (req, res, next) => {
    const { params, user: currUser } = req;
    try {
      const response = await postLikeService.unlikePost(currUser, params?.pid);
      res.json({ message: "success unlike post", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const getUserHasLikeByCurrentUser = async (req, res, next) => {
    const { user, params } = req;
    try {
      const response = await postLikeService.getUserHasLikeByCurrentUser(
        user,
        params?.pid
      );
      res.json({ hasLike: response });
    } catch (error) {
      return next(error);
    }
  };

  const getAllUserLikeByCurrentUser = async (req, res, next) => {
    const { user, query } = req;
    try {
      const response = await postLikeService.getAllUserLikeByCurrentUser(user, query);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  return {
    likePost,
    unlikePost,
    getUserHasLikeByCurrentUser,
    getAllUserLikeByCurrentUser,
  };
};

export default PostLikeController;
