import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client';



export interface SocketSlice {
  socket: Socket | null
}

const initialState: SocketSlice = {
  socket: null
}


export const socketSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
      return state;
    }
  },
})

export default socketSlice