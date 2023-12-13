import { createSlice } from "@reduxjs/toolkit"

const commentReducer = createSlice({
  name: "comment",
  initialState: {
    comment: {
      isOpen: false,
      postId: null,
    },
    updateComment: {
      isOpen: false,
      commentId: null,
      title: "",
      postId: null
    },
    replyComment: {
      isOpen: false,
      parentId: null,
      repliedCommentId: null
    },
    updateReplyComment: {
      isOpen: false,
      updatedCommentId: null
    },
  },
  reducers: {
    openUpdateCommentInput: (state, { payload }) => {
      state.comment = {}
      state.replyComment = {}
      state.updateReplyComment = {}
      const { commentId, title, postId } = payload
      state.updateComment.commentId = commentId
      state.updateComment.title = title
      state.updateComment.postId = postId
      if (postId && commentId) {
        state.updateComment.isOpen = true
      }
    },
    closeUpdateCommentInput: (state, { payload }) => {
      state.updateComment.commentId = null
      state.updateComment.inputId = null
      state.updateComment.isOpen = false
      state.updateComment.postId = null
      state.updateComment.title = ""
    },

    openReplyCommentInput: (state, { payload }) => {
      state.updateComment = {}
      state.comment = {}
      state.updateReplyComment = {}

      const { parentId, repliedCommentId } = payload
      state.replyComment.parentId = parentId
      state.replyComment.repliedCommentId = repliedCommentId

      if (parentId && repliedCommentId) {
        state.replyComment.isOpen = true
      }
    },

    closeReplyCommentInput: (state, { payload }) => {
      state.replyComment.isOpen = false
      state.replyComment.parentId = null
      state.replyComment.repliedCommentId = null
    },

    openCommentInput: (state, { payload }) => {
      state.updateComment = {}
      state.replyComment = {}
      state.updateReplyComment = {}

      const { postId } = payload
      state.comment.postId = postId
      if (postId) state.comment.isOpen = true
    },

    closeCommentInput: (state, { payload }) => {
      state.comment = {}
    },

    openUpdateReplyCommentInput: (state, { payload }) => {
      state.comment = {}
      state.replyComment = {}
      state.updateComment = {}

      const { updatedCommentId } = payload
      state.updateReplyComment.updatedCommentId = updatedCommentId
      state.updateReplyComment.isOpen = true
    },

    closeUpdateReplyCommentInput: (state, { payload }) => {
      state.updateReplyComment = {}
    }


  }
})

export default commentReducer