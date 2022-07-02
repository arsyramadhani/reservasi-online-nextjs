import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    FILL_USER: (state, action) => {
      state.isLogin = true;
      state.data = action.payload;
    },
    CLEAR_USER: (state, action) => {
      state.isLogin = false;
      state.data = null;
    },
  },
});

export const { FILL_USER, CLEAR_USER } = userSlice.actions;

export default userSlice.reducer;
