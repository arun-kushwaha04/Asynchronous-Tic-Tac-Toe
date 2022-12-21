import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import gameReducer from './gameSlice';

const store = configureStore({
 reducer: { authReducer: authReducer, gameReducer: gameReducer },
});

export default store;
