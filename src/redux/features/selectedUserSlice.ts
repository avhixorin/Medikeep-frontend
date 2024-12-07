import { User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedUserState = {
  selectedUser: User | null;
};

const initialState: SelectedUserState = {
  selectedUser: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
