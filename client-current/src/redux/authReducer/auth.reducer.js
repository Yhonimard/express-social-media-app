import { createSlice } from "@reduxjs/toolkit"

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      username: null,
      photoProfile: null,
      token: null,
      isAuthorized: false
    }
  },
  reducers: {
    setUserAuthentication: (state, { payload }) => {
      state.user.id = payload.id
      state.user.username = payload.username
      state.user.photoProfile = payload.photoProfile
      state.user.token = payload.token
      state.user.isAuthorized = true
    }
  }
})

export default authReducer