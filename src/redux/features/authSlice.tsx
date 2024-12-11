import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserTheme: (state, action: PayloadAction<"light" | "dark" | "retro" | "synthwave" | "cyberpunk">) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    updateUserFields: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    addConnection: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user.connections = state.user.connections || [];
        state.user.connections.push(action.payload);
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.connections) {
        state.user.connections = state.user.connections.filter(
          (connection) => connection._id !== action.payload
        );
      }
    },
    addConnectionRequest: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user.connectionRequests = state.user.connectionRequests || [];
        state.user.connectionRequests.push(action.payload);
      }
    },
    removeConnectionRequest: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.connectionRequests) {
        state.user.connectionRequests = state.user.connectionRequests.filter(
          (request) => request._id !== action.payload
        );
      }
    },
  },
});

export const {
  setAuthUser,
  setUserTheme,
  clearAuthUser,
  updateUserFields,
  addConnection,
  removeConnection,
  addConnectionRequest,
  removeConnectionRequest,
} = authSlice.actions;

export default authSlice.reducer;
