import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reservationApi from "../../services/api/reservation";

export const fetchTimeSchedule = createAsyncThunk(
  "timeSchedule/FetchTimeSchedule",
  async (_, thunkAPI) => {
    const response = await reservationApi.getAllTimeSchedule();
    return response.data;
  }
);

const initialState = {
  data: null,
  error: null,
};

export const timeScheduleSlice = createSlice({
  name: "timeSchedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTimeSchedule.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchTimeSchedule.rejected, (state, action) => {
      state.data = null;
    });
  },
});

export default timeScheduleSlice.reducer;
