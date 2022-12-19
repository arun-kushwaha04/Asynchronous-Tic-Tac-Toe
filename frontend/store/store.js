import { configureStore } from 'redux';
import authReducer from './authSlice';

const store = configureStore({
 reducer: { authReducer: authReducer },
});

export default store;
