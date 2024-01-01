import { createSlice } from "@reduxjs/toolkit"


const chatReducer = createSlice({
  name: "chat",
  initialState: {
    message: {
      isOpen: false,
      user: {
        id: null,
        username: null,
        photo_profile: null,
      }
    },
  },
  reducers: {
    openMessageLayout: (state, { payload }) => {
      const { id, username, photo_profile } = payload
      state.message.user.id = id
      state.message.user.username = username
      state.message.user.photo_profile = photo_profile
      if (id) state.message.isOpen = true
    },
    closeMessageLayout: (state) => {
      state.message.user.id = null
      state.message.user.username = null
      state.message.user.photo_profile = null
      state.message.isOpen = false
    },
  },
})
// state.messageData.messages = msg.filter((data, i, s) => i === s.findIndex(t => t.id === data.id))

export default chatReducer