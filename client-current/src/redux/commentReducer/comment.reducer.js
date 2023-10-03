import { createSlice } from "@reduxjs/toolkit"

const commentReducer = createSlice({
  name: "comment",
  initialState: {
    updateComment: {
      id: null,
      title: "",
      isUpdate: false
    }
  },
  reducers: {
    setUpdateComment: (state, { payload: { id, title, isUpdate } }) => {
      state.updateComment.id = id
      state.updateComment.title = title
      state.updateComment.isUpdate = isUpdate
    }
  }
})

export default commentReducer