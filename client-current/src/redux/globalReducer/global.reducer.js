import { createSlice } from "@reduxjs/toolkit"
import { enqueueSnackbar } from "notistack"

const globalReducer = createSlice({
  name: "global",
  initialState: {
    loadingOverlay: {
      isOpen: false
    }
  },
  reducers: {
    showLoadingOverlay: (state, { payload }) => {
      state.loadingOverlay.isOpen = payload
    },
    showNotification: (state, { payload }) => {
      const { message, status: variant } = payload
      enqueueSnackbar({ message, variant })
    }
  }
})

export default globalReducer