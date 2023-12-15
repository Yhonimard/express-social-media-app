import { createSlice } from "@reduxjs/toolkit"

import chatThunk from "./chat.thunk"
import moment from "moment"

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
    messageData: {
      messages: [],
      isLast: null,
      totalData: null,
      totalPages: null,
      lastId: null,
      pageNo: 1,
      isLoading: false
    }
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
      state.messageData.pageNo = 1
      state.messageData.isLast = null
      state.messageData.lastId = null
      state.messageData.messages = []
      state.messageData.totalData = null
      state.messageData.totalPages = null
    },
    fetchNextMessage: (state) => {
      state.messageData.pageNo = state.messageData.pageNo + 1
    },
    sendMessage: (state, { payload }) => {
      const { data: newData } = payload
      // const newData = {
      //   id: lastId + 1,
      //   created_at: moment().format(""),
      //   text: data.text
      // }
      state.messageData.messages = [newData, ...state.messageData.messages]
      state.messageData.lastId = state.messageData.lastId + 1
    },
    receiveNewMessage: (state, { payload: newMsg}) => {
      const msg = [newMsg, ...state.messageData.messages]
      const newData = msg.filter((data, i, s) => i === s.findIndex(t => t.id === data.id))
      state.messageData.messages = msg
    }
  },
  extraReducers: (builder) => {
    builder.addCase(chatThunk.getMessages.pending, (state) => {
      state.messageData.isLoading = true
    }).addCase(chatThunk.getMessages.fulfilled, (state, { payload }) => {
      const { totalData, data, isLast, lastId, totalPages } = payload

      const newDataAfterPagination = [...state.messageData.messages, ...data]
      const uniqueData = newDataAfterPagination.filter((data, i, s) => i === s.findIndex(t => t.id === data.id))

      state.messageData.messages = state.messageData.messages.length === 0 ? data : uniqueData
      state.messageData.totalData = totalData
      state.messageData.isLast = isLast
      state.messageData.lastId = lastId
      state.messageData.totalPages = totalPages
      state.messageData.isLoading = false

    }).addCase(chatThunk.getMessages.rejected, (state, { payload }) => {
      state.messageData.isLoading = false
    })



  }
})

export default chatReducer