import { createSlice } from "@reduxjs/toolkit";


const profileReducer = createSlice({
  name: "profile",
  initialState: {
    tabsLocation: 0,
    followers: {
      searchValue: '',
    },
    following: {
      searchValue: "",
    },
    isOpenFollowersModal: false,
    isOpenFollowingModal: false
  },
  reducers: {
    setTabsLocation: (state, { payload }) => {
      state.tabsLocation = payload
    },

    setFollowersSearchValue: (state, { payload }) => {
      state.followers.searchValue = payload
    },

    setFollowingSearchValue: (state, { payload }) => {
      state.following.searchValue = payload
    },

    toggleFollowersModal: (state) => {
      state.isOpenFollowersModal = !state.isOpenFollowersModal
    },

    toggleFollowingModal: (state) => {
      state.isOpenFollowingModal = !state.isOpenFollowingModal
    }

  }
})


export default profileReducer
