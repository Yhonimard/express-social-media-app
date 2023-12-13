import httpStatus from "http-status"

const CommentController = (service) => {

  const getComments = async (req, res, next) => {
    try {
      const result = await service.getComments(req.query, req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const createComment = async (req, res, next) => {
    try {
      const result = await service.createComment(req.body, req.params, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const updateComment = async (req, res, next) => {
    try {
      const result = await service.updateComment(req.body, req.params, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const deleteComment = async (req, res, next) => {
    try {
      await service.deleteComment(req.params, req.user)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const getUserHasLikeComment = async (req, res, next) => {
    try {
      const result = await service.getUserHasLikeComment(req.params, req.user)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }


  const likeComment = async (req, res, next) => {
    try {
      await service.likeComment(req.params, req.user)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }


  const unlikeComment = async (req, res, next) => {
    try {
      await service.unlikeComment(req.params, req.user)
      res.json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const getRepliesComment = async (req, res, next) => {
    try {
      const result = await service.getRepliesComment(req.query, req.params)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  const replyComment = async (req, res, next) => {
    try {
      await service.replyComment(req.body, req.params, req.user)
      res.status(httpStatus.CREATED).json({ message: "success" })
    } catch (error) {
      return next(error)
    }
  }

  const getUserComment = async (req, res, next) => {
    try {
      const result = await service.getUserComment(req.user, req.query)
      res.json(result)
    } catch (error) {
      return next(error)
    }
  }

  return {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getUserHasLikeComment,
    likeComment,
    unlikeComment,
    getRepliesComment,
    replyComment,
    getUserComment
  }
}
export default CommentController