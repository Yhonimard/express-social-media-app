import { createSlice } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"

const globalReducer = createSlice({
  name: "global",
  initialState: {
    isOpenLoadingOverlay: false,
    headerSearch: {
      searchValue: "",
      tabsLocation: 0
    }
  },


  reducers: {
    showLoadingOverlay: (state, { payload }) => {
      state.isOpenLoadingOverlay = payload
    },
    closeLoadingOverlay: (state) => {
      state.isOpenLoadingOverlay = false
    },
    showNotification: (state, { payload }) => {
      enqueueSnackbar({ message: payload.message || "something went wrong please try again", variant: payload?.status || "default" })
    },
    setHeaderSearchTabValue: (state, { payload }) => {
      const { tabsLocation } = payload
      state.headerSearch.tabsLocation = tabsLocation
    },
    setHeaderSearchInputValue: (state, { payload }) => {
      const { searchValue } = payload
      state.headerSearch.searchValue = searchValue
    }

  }

})

export default globalReducer
