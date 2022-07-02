import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import reservationApi from "../../services/api/reservation";

export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async (_, thunkAPI) => {
    const response = await reservationApi.GetAllLocation();
    return response.data;
  }
);

const initialState = {
  data: null,
  error: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    SET_LOCATION: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocation.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchLocation.rejected, (state, action) => {
      state.data = null;
    });
  },
});

export const { SET_LOCATION } = locationSlice.actions;

export default locationSlice.reducer;
