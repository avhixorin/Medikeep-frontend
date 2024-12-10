import { Messages, MessageState, PrivateMessage, User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MessageState = {
  chatHistories: {},
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setChatHistory: (state, action: PayloadAction<Messages>) => {
      if (action.payload.length === 0) {
        console.warn("Payload is empty, no action taken.");
        return;
      }
      action.payload.forEach((message) => {
        if(!state.chatHistories) {
          state.chatHistories = {}
        }
        if (!state.chatHistories[message.friendId]) {
          state.chatHistories[message.friendId] = [];
        }
        state.chatHistories[message.friendId] = message.chatHistory;
      });
    },

    addMyMessage: (state, action: PayloadAction<{ message: string; to: User; messageId: string; sender: User }>) => {
      const { to, messageId, message, sender } = action.payload;
      if (!state.chatHistories[to._id!]) {
        state.chatHistories[to._id!] = [];
      }
      state.chatHistories[to._id!].push({
        messageId,
        message,
        sender,
      });
    },

    addFriendMessage: (state, action: PayloadAction<PrivateMessage>) => {
      const { sender } = action.payload;
      if (!state.chatHistories[sender._id!]) {
        state.chatHistories[sender._id!] = [];
      }
      state.chatHistories[sender._id!].push(action.payload);
    },

    removeMessagesOfUser: (state, action: PayloadAction<string>) => {
      delete state.chatHistories[action.payload];
    },

    clearAllMessages: () => {
      return initialState;
    },

    clearMessagesOfUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.chatHistories[userId]) {
        state.chatHistories[userId] = [];
      }
    },

    deleteSpecificMessage: (state, action: PayloadAction<{ friendId: string; messageId: string }>) => {
      const { friendId, messageId } = action.payload;
      if (state.chatHistories[friendId]) {
        state.chatHistories[friendId] = state.chatHistories[friendId].filter(
          (message) => message.messageId !== messageId
        );
      }
    },
  },
});

export const {
  addMyMessage,
  addFriendMessage,
  removeMessagesOfUser,
  clearAllMessages,
  clearMessagesOfUser,
  deleteSpecificMessage,
  setChatHistory,
} = messageSlice.actions;

export default messageSlice.reducer;
