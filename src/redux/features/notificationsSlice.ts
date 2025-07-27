import { notification } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationsState {
  notifications: notification[];
}

const initialState: NotificationsState = {
  notifications: [],
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
      if (state.notifications[index]) {
        state.notifications[index].read = true;
      }
    },
    markMultipleAsRead: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach((index) => {
        if (state.notifications[index]) {
          state.notifications[index].read = true;
        }
      });
    },
    deleteNotification: (state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1);
    },
    deleteMultipleNotifications: (state, action: PayloadAction<number[]>) => {
      state.notifications = state.notifications.filter(
        (_, i) => !action.payload.includes(i)
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markMultipleAsRead,
  deleteNotification,
  deleteMultipleNotifications,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
