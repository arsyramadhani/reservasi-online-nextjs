import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reservationApi from "../../services/api/reservation";

export const getRoomByLocation = createAsyncThunk(
  "room/getRoomByLocation",
  async (kdLokasi, thunkAPI) => {
    const response = await reservationApi.GetRoomByLocation(kdLokasi);
    return response.data;
  }
);

const initialState = {
  data: null,
  error: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomByLocation.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(getRoomByLocation.rejected, (state, action) => {
      state.data = null;
    });
  },
});

export default roomSlice.reducer;
