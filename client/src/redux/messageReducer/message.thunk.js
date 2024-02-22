import api from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getMessages = createAsyncThunk('messages/get', async (page, { rejectWithValue, getState }) => {
  try {
    const chatState = getState().chat
    const res = await api.request.getMessages(chatState.message.user.id, page)
    return res
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


export default {
  getMessages
}