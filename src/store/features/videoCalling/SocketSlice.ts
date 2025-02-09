import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import Peer from "peerjs";

// Define the initial state type
interface SocketState {
  user: Peer | null;
  stream?: MediaStream;
  peers: Record<string, { stream: MediaStream }>;
}

// Initial state
const initialState: SocketState = {
  user: null,
  stream: undefined,
  peers: {},
};

// Async thunk to fetch user media
export const fetchUserFeed = createAsyncThunk("socket/fetchUserFeed", async () => {
  return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
});

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Peer>) => {
      state.user = action.payload;
    },
    addPeer: (state, action: PayloadAction<{ peerId: string; stream: MediaStream }>) => {
      state.peers[action.payload.peerId] = { stream: action.payload.stream };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeed.fulfilled, (state, action) => {
      state.stream = action.payload;
    });
  },
});

export const { setUser, addPeer } = socketSlice.actions;
export default socketSlice.reducer;
