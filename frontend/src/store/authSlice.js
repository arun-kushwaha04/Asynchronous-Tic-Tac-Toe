import { createSlice } from '@reduxjs/toolkit';

// const STATUS = Object.freeze({
//  IDLE: 'idle',
//  LOADING: 'loading',
//  ERROR: 'error',
// });

const authSlice = createSlice({
 name: 'auth',
 initialState: {
  userToken: localStorage.getItem('userToken') || null,
  isAuthenticated: false,
  userData: JSON.parse(localStorage.getItem('user-data')) || null,
 },
 reducers: {
  login: (state, action) => {
   console.log(action);
   localStorage.setItem('userToken', action.payload.token);
   localStorage.setItem('user-data', JSON.stringify(action.payload.userData));
   return {
    userToken: action.payload.token,
    isAuthenticated: true,
    userData: action.payload.userData,
   };
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
