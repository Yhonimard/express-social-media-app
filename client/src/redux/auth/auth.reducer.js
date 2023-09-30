import { createSlice } from "@reduxjs/toolkit";
import auth from ".";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    data: {
      username: null,
      id: null,
      photoProfile: null,
      token: null,
      isAuthorized: false
    },
    isSendingData: false
  },
  reducers: {
    setUser: (state, { payload: { username, id, photoProfile, token } }) => {
      state.data.username = username
      state.data.id = id
      state.data.photoProfile = photoProfile
      state.data.token = token
      state.data.isAuthorized = true
    },

    removeUser: (state, { payload }) => {
      state.data.id = null
      state.data.isAuthorized = false
      state.data.photoProfile = null
      state.data.token = null
      state.data.username = null
    }
  },
  extraReducers(builder) {
    builder.addCase(auth.request.signup.pending, (state) => {
      state.isSendingData = true
    })

    builder.addCase(auth.request.signup.fulfilled, (state, { payload: { data } }) => {
      state.data.username = data.username
      state.data.id = data.id
      state.data.photoProfile = data.photoProfile
      state.data.token = data.token
      state.data.isAuthorized = true
      state.isSendingData = false
    })

    builder.addCase(auth.request.signup.rejected, (state) => {
      state.isSendingData = false
    })

    builder.addCase(auth.request.login.pending, (state) => {
      state.isSendingData = false
    })

    builder.addCase(auth.request.login.fulfilled, (state, { payload: { data } }) => {
      state.data.username = data.username
      state.data.id = data.id
      state.data.photoProfile = data.photoProfile
      state.data.token = data.token
      state.data.isAuthorized = true
      state.isSendingData = false
    })

    builder.addCase(auth.request.login.rejected, (state) => {
      state.isSendingData = false
    })


  }
})


export default authReducer