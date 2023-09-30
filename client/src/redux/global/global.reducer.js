import { createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const globalReducer = createSlice({
  name: "global",
  initialState: {
    navbarDrawer: {
      open: false
    },
    backdrop: {
      open: false
    }
  },
  reducers: {
    showNotification: (state, { payload }) => {
      enqueueSnackbar({ message: payload.message, variant: payload.status })
    },
    showNavbarLeftDrawer: (state, { payload }) => {
      state.navbarDrawer.open = payload
    },
    showBackdrop: (state, { payload }) => {
      state.backdrop.open = payload
    },
  }
})

export default globalReducer