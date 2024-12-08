import { PrivateMessage, User } from "@/types/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const registerUrl = import.meta.env.VITE_SIGN_UP_URL;
    const response = await axios.post(registerUrl, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(
      typeof axiosError.response?.data === "string"
        ? axiosError.response.data
        : axiosError.message
    );
  }
});

// Auth state interface
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
    setUserTheme: (state, action: PayloadAction<"light" | "dark">) => {
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
    addMyMessage: (
      state,
      action: PayloadAction<{
        message: string;
        to: User;
        messageId: string;
        sender: User;
      }>
    ) => {
      const { to } = action.payload;
      if (state.user) {
        state.user.messages = state.user.messages || {};
        state.user.messages = {};
        if (!state.user.messages![to._id!]) {
          state.user.messages[to._id!] = [];
        }
        state.user.messages[to._id!].push({
          messageId: action.payload.messageId,
          message: action.payload.message,
          sender: action.payload.sender,
        });
      }
    },
    addFriendMessage: (state, action: PayloadAction<PrivateMessage>) => {
      if (state.user) {
        state.user.messages = state.user.messages || {};
        const chat = state.user.messages[action.payload.sender._id!];
        if (chat) {
          chat.push({
            messageId: action.payload.messageId,
            message: action.payload.message,
            sender: action.payload.sender!,
          });
        } else {
          state.user.messages[action.payload.sender._id!] = [
            {
              messageId: action.payload.messageId,
              message: action.payload.message,
              sender: action.payload.sender!,
            },
          ];
        }
      }
    },
    removeMessagesOfUser: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.messages) {
        delete state.user.messages[action.payload];
      }
    },
    clearMessagesOfUser: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.messages) {
        const chat = state.user.messages[action.payload];
        if (chat) {
          state.user.messages[action.payload] = [];
        }
      }
    },
    deleteSpecificMessage: (
      state,
      action: PayloadAction<{ friendId: string; messageId: string }>
    ) => {
      if (state.user && state.user.messages) {
        const chat = Object.values(state.user.messages).find(
          (msgArray) => msgArray.some((msg) => msg.sender._id === action.payload.friendId)
        );
        if (chat) {
          state.user.messages[action.payload.friendId] = chat.filter(
            (msg) => msg.messageId !== action.payload.messageId
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
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
  addMyMessage,
  addFriendMessage,
  removeMessagesOfUser,
  clearMessagesOfUser,
  deleteSpecificMessage,
} = authSlice.actions;

export default authSlice.reducer;
