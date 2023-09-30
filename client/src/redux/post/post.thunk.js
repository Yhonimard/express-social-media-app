import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import global from "../global";

const createPost = createAsyncThunk("post/create", async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.request.post("/post", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    dispatch(global.action.showNotification({ message: "success creating new post", status: "success" }))
    return res.data
  } catch (error) {
    const { response: { data: { message } } } = error
    dispatch(global.action.showNotification({ message, status: "error" }))
    return rejectWithValue(error)
  }
})

const getAllPost = createAsyncThunk("post/getAll", async (size, { rejectWithValue }) => {
  try {
    const res = await api.request.get(`/post?pageNo=1&size=${size}`)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

const deletePost = createAsyncThunk("post/delete", async (postId, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.request.delete(`/post/${postId}`)
    dispatch(global.action.showNotification({ message: "success delete post", status: "success" }))
    return res.data
  } catch (error) {
    const { response: { data: { message } } } = error
    dispatch(global.action.showNotification({ message, status: "error" }))
    return rejectWithValue(error)
  }
})


export default {
  createPost,
  getAllPost,
  deletePost
}