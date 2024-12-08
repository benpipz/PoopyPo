import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: { points: [], lastPoint: null, localLocation: null },
  reducers: {
    addPointToStore: (state, action) => {
      state.points.push(action.payload);
    },
    setInitialPoints: (state, action) => {
      state.points = action.payload;
    },
    setLocalLocation: (state, action) => {
      state.localLocation = action.payload;
    },
    resetLocation: (state, action) => {
      state.lastPoint = action.payload;
    },
    updateVotesForPoint: (state, action) => {
      const point = state.points.find(
        (point) => point.id === action.payload.id
      );
      point.votes = action.payload.votes;
    },
  },
});

export const {
  addPointToStore,
  setLocalLocation,
  resetLocation,
  setInitialPoints,
  updateVotesForPoint,
} = mapSlice.actions;

export default mapSlice.reducer;
