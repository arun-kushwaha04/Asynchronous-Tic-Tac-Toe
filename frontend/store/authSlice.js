import { createSlice } from '@reduxjs/toolkit';

const STATUS = Object.freeze({
 IDLE: 'idle',
 LOADING: 'loading',
 ERROR: 'error',
});

const authSlice = createSlice({
 name: 'auth',
 initialState: {
  userToken: localStorage.getItem('userToken'),
  isAuthenticated: false,
  userData: {},
 },
 reducers: {
  login: (state, action) => {
   state.isAuthenticated = true;
   state.userData = action.payload;
  },
  logout: (state) => {
   localStorage.removeItem('userToken');
   state.userToken = null;
   state.isAuthenticated = false;
   state.userData = {};
  },
 },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
