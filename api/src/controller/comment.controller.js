import httpStatus from "http-status"
import ApiBadRequestError from "../exception/ApiBadRequestError"
import CommentService from "../service/comment.service"
import commentValidation from "../validation/comment.validation"

const CommentController = () => {
  const commentService = CommentService()
  const validation = commentValidation
  const createComment = async (req, res, next) => {
    const { params: { postId }, user, body: data } = req
    try {
      const { error: errorBody } = validation.createCommentValidation.body.validate(data)
      const { error: errorParam } = validation.createCommentValidation.param.validate({ postId })
      if (errorBody || errorParam) throw new ApiBadRequestError(errorBody?.message || errorParam?.message)
      const response = await commentService.createComment(postId, user, data)
      res.status(httpStatus.CREATED).json({ message: "success create comment", data: response })
    } catch (error) {
      return next(error)
    }
  }

  const getCommentByPostId = async (req, res, next) => {
    const { params: { postId }, query } = req
    const size = parseInt(query.size)
    const pageNo = parseInt(query.pageNo)
    try {
      const response = await commentService.getCommentByPostId(postId, pageNo, size)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  return {
    createComment,
    getCommentByPostId
  }
}
export default CommentController