
import { createSlice } from '@reduxjs/toolkit';

export interface User {
    _id: string | null;
    profilePicture?: string;
    username: string;
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    role: string;
    medicalLicenseNumber?: string;
    specialization?: string;
    yearsOfExperience?: number;
    clinicAffiliation?: string[];
    consultationHours?: { start: string; end: string }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

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

