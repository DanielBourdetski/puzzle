import { configureStore } from '@reduxjs/toolkit'

import socketSlice from './socketSlice';

export default configureStore({
  reducer: {
    socket: socketSlice.reducer
  },
});

export const socketActions = socketSlice.actions;