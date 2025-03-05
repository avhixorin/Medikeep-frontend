import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: false
};

const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {
        setAdmin: (state) => {
            state.admin = true;
        },
        resetAdmin: () => initialState
    }
});

export const { setAdmin, resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
