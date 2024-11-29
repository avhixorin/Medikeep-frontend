import { User } from '@/types/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const registerUrl = import.meta.env.VITE_SIGN_UP_URL;
      const response = await axios.post(registerUrl, userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        typeof axiosError.response?.data === 'string'
          ? axiosError.response.data
          : axiosError.message
      );
    }
  }
);

// Auth state interface
interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      if (state.user) {
        state.user.theme = action.payload;
      }
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    updateUserFields: (
      state,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setAuthUser, setUserTheme, clearAuthUser, updateUserFields } =
  authSlice.actions;
export default authSlice.reducer;
