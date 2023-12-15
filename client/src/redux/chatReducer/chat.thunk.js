import api from "@/api"
import { createAsyncThunk } from "@reduxjs/toolkit"

const getMessages = createAsyncThunk('message/get', async ({ query, userId }, { rejectWithValue }) => {
  try {
    const res = await api.request.getMessages(userId, query)
    return res
  } catch (error) {
    return rejectWithValue(error)
  }
})

export default {
  getMessages,
}