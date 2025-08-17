import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import allUsersSlice from "../features/allUsersSlice";
import notificationsSlice from "../features/notificationsSlice";
import messageSlice from "../features/messageSlice";
import selectedUserSlice from "../features/selectedUserSlice";
import adminSlice from "../features/adminSlice";
import recordSlice from "../features/recordSlice";
import aiChatSlice from "../features/aiChatSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  allUsers: allUsersSlice,
  notifications: notificationsSlice,
  messages: messageSlice,
  selectedUser: selectedUserSlice,
  admin: adminSlice,
  record: recordSlice,
  aiChat: aiChatSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
