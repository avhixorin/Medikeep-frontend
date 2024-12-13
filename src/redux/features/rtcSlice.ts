import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type rtcInitialState = {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  constraints: MediaStreamConstraints;
  peerConnection: RTCPeerConnection | null;
  answer: RTCSessionDescriptionInit | null;
  offer: RTCSessionDescriptionInit | null;
};

const initialState: rtcInitialState = {
  localStream: null,
  remoteStream: null,
  constraints: {
    video: true,
    audio: true,
  },
  peerConnection: null,
  answer: null,
  offer: null,
};

const rtcSlice = createSlice({
  name: "rtc",
  initialState,
  reducers: {
    setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.remoteStream = action.payload;
    },
    setConstraints: (state, action: PayloadAction<MediaStreamConstraints>) => {
      state.constraints = action.payload;
    },
    setPeerConnection: (state, action: PayloadAction<RTCPeerConnection | null>) => {
      state.peerConnection = action.payload;
    },
    setAnswer: (state, action: PayloadAction<RTCSessionDescriptionInit | null>) => {
      state.answer = action.payload;
    },
    setOffer: (state, action: PayloadAction<RTCSessionDescriptionInit | null>) => {
      state.offer = action.payload;
    },
    cleanUpConnection: (state) => {
      
      if (state.peerConnection) {
        state.peerConnection.ontrack = null;
        state.peerConnection.onicecandidate = null;
        state.peerConnection.close();
      }

      state.localStream?.getTracks().forEach((track) => track.stop());
      state.remoteStream?.getTracks().forEach((track) => track.stop());

      state.peerConnection = null;
      state.localStream = null;
      state.remoteStream = null;
      state.answer = null;
      state.offer = null;
    },
  },
});

export const {
  setLocalStream,
  setRemoteStream,
  setConstraints,
  setPeerConnection,
  setAnswer,
  setOffer,
  cleanUpConnection,
} = rtcSlice.actions;

export default rtcSlice.reducer;
