import httpStatus from "http-status";
import ApiBadRequestError from "../exception/ApiBadRequestError";
import PostService from "../service/post/post.service";
import postValidation from "../validation/post.validation";

const PostController = () => {
  const validation = postValidation;
  const service = PostService();

  const createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;

    try {

      const data = {
        title,
        content,
        image: req.file.path,
      };

      const response = await service.createPost(data, user);

      res
        .status(httpStatus.CREATED)
        .json({ message: "success create post", data: response });
    } catch (error) {
      return next(error);
    }
  };

  const getAllPost = async (req, res, next) => {
    const pageNo = parseInt(req.query.pageNo) || 1;
    const size = parseInt(req.query.size) || 4;
    try {
      const response = await service.getAllPost(pageNo, size);
      res.status(httpStatus.OK).json(response)
    } catch (error) {
      return next(error);
    }
  };

  const updatePost = async (req, res, next) => {
    const { body, params: { postId }, user, } = req;

    try {
      await service.updatePost(postId, user, body);
      res.json({ message: "success update post" });
    } catch (error) {
      return next(error);
    }
  };

  const deletePost = async (req, res, next) => {
    const { params: { postId }, user, } = req;
    try {
      await service.deletePost(postId, user);
      res.json({ message: "success delete post" });
    } catch (error) {
      return next(error);
    }
  };

  const getPostById = async (req, res, next) => {
    const { params } = req;
    try {
      const response = await service.getPostById(params?.postId);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getAllPostByCurrentUser = async (req, res, next) => {
    const { query, user } = req;
    const pageNo = parseInt(query.pageNo);
    const size = parseInt(query.size) || 4;

    try {
      const response = await service.getAllPostByCurrentUser(
        pageNo,
        size,
        user
      );
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const updatePostByUser = async (req, res, next) => {
    try {
      await service.updatePostByUser(req.user, req.params.pid, req.body);
      res.json({ message: "success update post by user" });
    } catch (error) {
      return next(error);
    }
  };

  const deletePostByUser = async (req, res, next) => {
    const { params, user: currUser } = req;
    try {
      await service.deletePostByUser(params.pid, currUser);
      res.json({ message: `success delete post user ${currUser.username}` });
    } catch (error) {
      return next(error);
    }
  };

  const createPostByUser = async (req, res, next) => {
    const { user: currUser, body } = req;
    try {
      const data = {
        ...body,
        image: req.file.path,
      };
      const response = await service.createPostByUser(currUser, data);
      res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return next(error);
    }
  };
  const getAllPostHasLikedCurrentUser = async (req, res, next) => {
    try {
      const response = await service.getAllPostHasLikedCurrentUser(req.user, req.query);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getPostByAuthorId = async (req, res, next) => {
    try {
      const response = await service.getPostByAuthorId(req.params, req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const searchPost = async (req, res, next) => {
    try {
      const response = await service.searchPost(req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  return {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getPostById,
    getAllPostByCurrentUser,
    updatePostByUser,
    deletePostByUser,
    createPostByUser,
    getAllPostHasLikedCurrentUser,
    getPostByAuthorId,
    searchPost
  };
};

export default PostController;
