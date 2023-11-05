import httpStatus from "http-status";
import ApiBadRequestError from "../exception/ApiBadRequestError";
import PostService from "../service/post.service";
import postValidation from "../validation/post.validation";

const PostController = () => {
  const validation = postValidation;
  const postService = PostService();

  const createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const user = req.user;

    try {
      const data = {
        title,
        content,
        image: req.file.path,
      };
      const { error } = validation.createPostValidation.body.validate(data);
      if (error) throw new ApiBadRequestError(error.message);

      const response = await postService.createPost(data, user);

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
    const commentSize = parseInt(req.query.commentSize) || 1;
    try {
      const { error } = validation.getPostValidation.query.validate({
        pageNo,
        size,
      });
      if (error) throw new ApiBadRequestError(error.message);
      const response = await postService.getAllPost(pageNo, size, commentSize);
      setTimeout(() => res.status(httpStatus.OK).json(response), 800)
    } catch (error) {
      return next(error);
    }
  };

  const updatePost = async (req, res, next) => {
    const {
      body,
      params: { postId },
      user,
    } = req;
    try {
      const { error: errorBody } =
        validation.updatePostValidation.body.validate(body);
      const { error: errorParam } =
        validation.updatePostValidation.param.validate({ postId });
      if (errorBody || errorParam)
        throw ApiBadRequestError(errorBody?.message || errorParam?.message);

      const response = await postService.updatePost(postId, user, body);
      res.json({ message: "success update post" });
    } catch (error) {
      return next(error);
    }
  };

  const deletePost = async (req, res, next) => {
    const {
      params: { postId },
      user,
    } = req;
    try {
      const { error: errorParam } =
        validation.deletePostValidation.param.validate({ postId });
      if (errorParam) throw new ApiBadRequestError(errorParam?.message);

      await postService.deletePost(postId, user);
      res.json({ message: "success delete post" });
    } catch (error) {
      return next(error);
    }
  };

  const getPostById = async (req, res, next) => {
    const { params } = req;
    try {
      const response = await postService.getPostById(params?.postId);
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
      const response = await postService.getAllPostByCurrentUser(
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
      const { error } = validation.updatePostByUserValidation.param.validate(
        req.params
      );
      if (error) throw new ApiBadRequestError(error.message);
      const response = await postService.updatePostByUser(
        req?.user,
        req.params.pid,
        req.body
      );
      res.json({ message: "success update post by user" });
    } catch (error) {
      return next(error);
    }
  };

  const deletePostByUser = async (req, res, next) => {
    const { params, user: currUser } = req;
    try {
      const { error } =
        validation.deletePostByUserValidation.param.validate(params);
      if (error) throw new ApiBadRequestError(error.message);
      await postService.deletePostByUser(params.pid, currUser);
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
      const { error } =
        validation.createPostByUserValidation.body.validate(data);
      if (error) throw new ApiBadRequestError(error.message);
      const response = await postService.createPostByUser(currUser, data);
      res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      return next(error);
    }
  };
  const getAllPostHasLikedCurrentUser = async (req, res, next) => {
    try {
      const response = await postService.getAllPostHasLikedCurrentUser(
        req.user,
        req.query
      );
      res.json(response);
    } catch (error) {
      return next(error);
    }
  };

  const getPostByAuthorId = async (req, res, next) => {
    try {
      const { error: errParams } = validation.getPostByAuthorId.params.validate(req.params)

      const { error: errQuery } = validation.getPostByAuthorId.query.validate(req.query)
      if (errParams || errQuery) throw new ApiBadRequestError(errParams?.message || errQuery?.message)
      const response = await postService.getPostByAuthorId(req.params, req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const searchPost = async (req, res, next) => {
    try {
      const response = await postService.searchPost(req.query)
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
