import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import global from "../global";


const createComment = createAsyncThunk("comment/create", async ({ postId, data }, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.request.post(`/post/${postId}/comment`, data)
    dispatch(global.action.showNotification({ message: "success creating new comment", status: "success" }))
    return res.data
  } catch (error) {
    const { response: { data: { message } } } = error
    dispatch(global.action.showNotification({ message, status: "error" }))
    return rejectWithValue(error)
  }
})

const getCommentByPostId = createAsyncThunk("comment/getByPostId", async ({ postId, size }, { rejectWithValue }) => {
  try {
    const res = await api.request.get(`/post/${postId}/comment?size=${size}`)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export default {
  createComment,
  getCommentByPostId
}