import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import global from "../global";

const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.request.post("/auth/register", data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    dispatch(global.action.showNotification({ message: "register success!!!", status: "success" }))
    return res.data
  } catch (error) {
    const { response: { data: { message } } } = error
    dispatch(global.action.showNotification({ message, status: "error" }))
    return rejectWithValue(error)
  }

})


const login = createAsyncThunk("auth/login", async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.request.post("/auth/login", data, {
    })
    dispatch(global.action.showNotification({ message: "login success!!!", status: "success" }))
    return res.data
  } catch (error) {
    const { response: { data: { message } } } = error
    dispatch(global.action.showNotification({ message, status: "error" }))
    return rejectWithValue(error)
  }
})


export default {
  signup,
  login
}
