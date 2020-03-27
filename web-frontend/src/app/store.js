import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from './authSlice';
import registerReducer from '../features/register/registerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    register: registerReducer
  },
});
