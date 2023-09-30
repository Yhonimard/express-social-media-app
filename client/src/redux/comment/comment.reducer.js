import { createSlice } from "@reduxjs/toolkit";
import comment from ".";

const commentReducer = createSlice({
  name: "comment",
  initialState: {
    createComment: {
      isLoading: false,
      isResetField: false
    },
    isLoading: false

  },

  extraReducers(builder) {
    builder.addCase(comment.request.createComment.pending, (state) => {
      state.createComment.isLoading = true
    }).addCase(comment.request.createComment.fulfilled, (state, { payload }) => {
      state.dataComments.push(payload.data)
      state.createComment.isLoading = false
      state.createComment.isResetField = true
    }).addCase(comment.request.createComment.rejected, (state) => {
      state.createComment.isLoading = false
      state.createComment.isResetField = true
    })
  }
})

export default commentReducer