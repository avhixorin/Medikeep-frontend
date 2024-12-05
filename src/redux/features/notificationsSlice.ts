import { notification } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  notifications: [] as notification[],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<notification[]>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<notification>) => {
      state.notifications.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.notifications[index].read = true;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { setNotifications, addNotification, markAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;