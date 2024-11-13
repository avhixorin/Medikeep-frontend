import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        clearAuthUser: (state) => {
            state.user = null;
        },
    },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;

