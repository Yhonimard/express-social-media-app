import { createSlice } from "@reduxjs/toolkit";

const homeReducer = createSlice({
  name: "home",
  initialState: {
    cardMenu: {
      open: false,
      anchorEl: null
    }
  },
  reducers: {
    showCardMenu: (state, { payload }) => {
      state.cardMenu.open = payload
    }
  },
})

export default homeReducer