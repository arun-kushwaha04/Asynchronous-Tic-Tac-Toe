import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
 name: 'game',
 initialState: {},
 reducers: {
  addGameData: (state, action) => {
   return action.payload;
  },
 },
});

export const { addGameData } = gameSlice.actions;
export default gameSlice.reducer;
