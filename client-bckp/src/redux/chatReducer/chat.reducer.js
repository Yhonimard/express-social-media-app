import { createSlice } from "@reduxjs/toolkit"

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    message: {
      toUser: null,
      isOpen: false
    }
  },
  reducers: {
    openChatMessage: (state, { payload: { toUser } }) => {
      state.message.toUser = toUser
      state.message.isOpen = true
    },
    closeChatMessage: (state) => {
      state.message.toUser = null
      state.message.isOpen = false
    }
  }
})

export default chatReducer
