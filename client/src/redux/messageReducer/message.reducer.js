import { createSlice } from "@reduxjs/toolkit"
import messageThunk from "./message.thunk"
import _ from "lodash"

const messageReducer = createSlice({
  name: 'message',
  initialState: {
    isLoading: false,
    chats: [],
    isLast: false,
    pageNo: 1
  },
  reducers: {
    addNewMsg: (state, { payload }) => {
      const newMsg = payload
      const chats = [newMsg, ...state.chats]
      state.chats = chats
    },
    closeMessage: (state) => {
      state.isLoading = false
      state.chats = []
      state.isLast = false
      state.pageNo = 1
    }
  },
  extraReducers: builder => {
    builder.addCase(messageThunk.getMessages.pending, state => {
      state.isLoading = true
    }).addCase(messageThunk.getMessages.fulfilled, (state, { payload }) => {
      const { chats, isLast } = payload
      state.isLoading = false
      state.chats = _.uniqBy([...state.chats, ...chats], 'render_id')
      state.isLast = isLast
      state.pageNo++
    })
  }
})

export default messageReducer