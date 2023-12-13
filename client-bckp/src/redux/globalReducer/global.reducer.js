import { createSlice } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"

const globalReducer = createSlice({
  name: "global",
  initialState: {
    loadingOverlay: {
      isOpen: false
    },
    headerSearch: {
      tabsLocation: "Post",
      searchValue: ""
    }
  },
  reducers: {
    showLoadingOverlay: (state, { payload }) => {
      state.loadingOverlay.isOpen = payload
    },
    showNotification: (state, { payload }) => {
      const { message, status: variant } = payload
      enqueueSnackbar({ variant: variant || "success", message: message || "something went wrong, please try again" })
    },
    setHeaderSearchTabsLocation: (state, { payload }) => {
      state.headerSearch.tabsLocation = payload.tabsLocation
    },
    setHeaderSearchValue: (state, { payload }) => {
      state.headerSearch.searchValue = payload.searchValue
    }
  }
})

export default globalReducer
