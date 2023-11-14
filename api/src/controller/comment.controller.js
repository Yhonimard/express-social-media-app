import httpStatus from "http-status"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import CommentService from "../service/comment.service"
import commentValidation from "../validation/comment.validation"
import db from "../config/db"
import prismaError from "../exception/prisma-error"

const CommentController = () => {
  const service = CommentService()
  const validation = commentValidation

  const createComment = async (req, res, next) => {
    const { params: { postId }, user, body: data } = req
    try {
      const { error: errorBody } = validation.createCommentValidation.body.validate(data)
      const { error: errorParam } = validation.createCommentValidation.param.validate({ postId })
      if (errorBody || errorParam) throw new ApiBadRequestError(errorBody?.message || errorParam?.message)
      const response = await service.createComment(postId, user, data)
      res.status(httpStatus.CREATED).json({ message: "success create comment", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const getCommentByPostId = async (req, res, next) => {
    const { params: { postId }, query } = req
    try {
      const response = await service.getCommentByPostId(postId, req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const updateCommentByPostId = async (req, res, next) => {
    const { params, user, body } = req

    try {
      const { error: errBody } = validation.updateCommentValidation.body.validate(body)
      const { error: errParams } = validation.updateCommentValidation.params.validate(params)
      if (errBody || errParams) throw new ApiBadRequestError(errBody?.message || errParams?.message)

      const response = await service.updateCommentByPostId(params.postId, params.commentId, body, user)
      res.json({ message: "success update post", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const deleteCommentByPostId = async (req, res, next) => {
    const { params, user } = req
    try {
      const { error } = validation.updateCommentValidation.params.validate(params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await service.deleteCommentByPostId(params.postId, params.commentId, user)
      res.json({ message: "success delete post", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const getCommentHasCommentedCurrentUser = async (req, res, next) => {
    try {
      const { error } = validation.getCommentHasCommentedCurrentUser.query.validate(req.query)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await service.getCommentHasCommentedCurrentUser(req.user, req.query)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }


  const likeCommentByCurruser = async (req, res, next) => {
    try {
      const { error } = validation.likeCommentByCurruserValidation.body.validate(req.body)
      if (error) throw new ApiBadRequestError(error.message)
      await service.likeCommentByCurruser(req.user, req.body)
      res.json({ message: "success like comment" })
    } catch (error) {
      return next(error)
    }
  }

  const unlikeCommentByCurrentUser = async (req, res, next) => {
    try {

      const { error } = validation.unlikeCommentByCurruserValidation.body.validate(req.body)
      if (error) throw new ApiBadRequestError(error.message)

      await service.unlikeCommentByCurrentUser(req.user, req.body)
      res.json({ message: "success unlike user" })
    } catch (error) {
      return next(error)
    }

  }

  const getCurrUserHasLikeComment = async (req, res, next) => {
    try {
      const { error } = validation.getCurrUserHasLikeCommentValidation.params.validate(req.params)
      if (error) throw new ApiBadRequestError(error.message)
      const response = await service.getCurrUserHasLikeComment(req.user, req.params)
      res.json({ hasLike: response })
    } catch (error) {
      return next(error)
    }
  }

  const getAllReplyCommentByCid = async (req, res, next) => {
    try {

      const response = await service.getAllReplyCommentByCid(req.params, req.query)

      res.json(response)
    } catch (error) {
      return next(error)
    }
  }

  const replyComment = async (req, res, next) => {
    try {
      const { error: errorParam } = validation.replyComment.params.validate(req.params)
      const { error: errorBody } = validation.replyComment.body.validate(req.body)
      if (errorParam || errorBody) throw new ApiBadRequestError(errorParam?.message || errorBody?.message)

      await service.replyComment(req.user, req.params, req.body)
      res.json({ message: "success reply comment" })
    } catch (error) {
      return next(error)
    }
  }

  const updateCommentReply = async (req, res, next) => {
    try {
      const { error } = validation.updateCommentReply.body.validate(req.body)
      if (error) throw new ApiBadRequestError(error.message)
      await service.updateCommentReply(req.user, req.body)
      res.json({ message: "success update comment" })
    } catch (error) {
      return next(error)
    }
  }

  const deleteReplyComment = async (req, res, next) => {
    try {
      const { error } = validation.deleteCommentReply.body.validate(req.body)
      if (error) throw new ApiBadRequestError(error.message)
      await service.deleteReplyComment(req.user, req.body)
      res.json({ message: "success delete comment" })
    } catch (error) {
      return next(error)
    }
  }

  return {
    createComment,
    getCommentByPostId,
    updateCommentByPostId,
    deleteCommentByPostId,
    getCommentHasCommentedCurrentUser,
    likeCommentByCurruser,
    unlikeCommentByCurrentUser,
    getCurrUserHasLikeComment,
    getAllReplyCommentByCid,
    replyComment,
    updateCommentReply,
    deleteReplyComment
  }
}
export default CommentController