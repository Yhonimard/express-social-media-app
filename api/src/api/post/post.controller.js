import httpStatus from "http-status"

const PostController = (service) => {

  const getPosts = async (req, res, next) => {
    try {
      const response = await service.getPosts(req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const createPost = async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        image: req.file.path
      }
      const response = await service.createPost(req.user, data)
      res.status(httpStatus.CREATED).json(response)
    } catch (error) {
      return next(error)
    }
  }


  const deletePost = async (req, res, next) => {
    try {
      await service.deletePost(req.user, req.params)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const updatePost = async (req, res, next) => {
    try {
      await service.updatePost(req.user, req.body, req.params)
      return res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const getPostDetail = async (req, res, next) => {
    try {
      const result = await service.getPostDetail(req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getUserHasLikePost = async (req, res, next) => {
    try {
      const result = await service.getUserHasLikePost(req.user, req.params)
      res.json({ hasLike: result })
    } catch (error) {
      return next(error)
    }
  }

  const likePost = async (req, res, next) => {
    try {
      await service.likePost(req.user, req.params)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const unlikePost = async (req, res, next) => {
    try {
      await service.unlikePost(req.user, req.params)
      res.json({ message: 'success' })
    } catch (error) {
      return next(error)
    }
  }

  const getCurrentUserPosts = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserPosts(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getPostsByUserId = async (req, res, next) => {
    try {
      const result = await service.getPostsByUserId(req.params, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getPostLikedUser = async (req, res, next) => {
    try {
      const result = await service.getPostLikedUser(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const searchPost = async (req, res, next) => {
    try {
      const result = await service.searchPost(req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const getCurrentUserTotalPosts = async (req, res, next) => {
    try {
      const result = await service.getCurrentUserTotalPosts(req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const getUserTotalPost = async (req, res, next) => {
    try {
      const result = await service.getUserTotalPost(req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  return {
    getPosts,
    createPost,
    deletePost,
    updatePost,
    getPostDetail,
    getUserHasLikePost,
    likePost,
    unlikePost,
    getCurrentUserPosts,
    getPostsByUserId,
    getPostLikedUser,
    searchPost,
    getCurrentUserTotalPosts,
    getUserTotalPost
  }
}

export default PostController