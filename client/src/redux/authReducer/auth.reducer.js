import { createSlice } from "@reduxjs/toolkit"

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      username: null,
      photo_profile: null,
      token: null,
      isAuthorized: false
    }
  },
  reducers: {
    setUserAuth: (state, { payload }) => {
      const { id, username, photo_profile, token } = payload
      state.user.id = id
      state.user.username = username
      state.user.photo_profile = photo_profile
      state.user.token = token
      state.user.isAuthorized = true
    },
    logoutUser: (state,) => {
      state.user.id = null
      state.user.username = null
      state.user.photo_profile = null
      state.user.token = null
      state.user.isAuthorized = false
    }
  }
})

export default authReducer