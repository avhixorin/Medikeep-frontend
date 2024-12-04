import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    users: User[];
}

const initialState:initialStateType = {
  users: [],
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    resetAllUsers: () => initialState,
  },
});

export const { setAllUsers, resetAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;