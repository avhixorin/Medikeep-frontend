import { PrivateMessage, User } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageState = {
  chatHistory: {
    [friendId: string]: PrivateMessage[];
  };
};

const initialState: MessageState = {
  chatHistory: {},
};


const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMyMessage: (state, action: PayloadAction<{message: string, to: User, messageId: string, sender: User}>) => {
      const { to } = action.payload;
      if (!state?.chatHistory[to._id!]) {
        state.chatHistory[to._id!] = [];
      }
      state.chatHistory[to._id!].push({
        messageId: action.payload.messageId,
        message: action.payload.message,
        sender: action.payload.sender,
      });
    },
    addFriendMessage: (
      state,
      action: PayloadAction<PrivateMessage>
    ) => {
      const { sender } = action.payload;
      if (!state?.chatHistory[sender._id!]) {
        state.chatHistory[sender._id!] = []; 
      }
      state.chatHistory[sender._id!].push(action.payload); 
    },
    removeMessagesOfUser: (state, action: PayloadAction<string>) => {
      delete state.chatHistory[action.payload];
    },
    clearAllMessages: () => {
      return initialState;
    },
    clearMessagesOfUser: (state, action: PayloadAction<string>) => {
      if (state.chatHistory[action.payload]) {
        state.chatHistory[action.payload] = [];
      }
    },
    deleteSpecificMessage: (
      state,
      action: PayloadAction<{ friendId: string; messageId: string }>
    ) => {
      const { friendId, messageId } = action.payload;
      if (state.chatHistory[friendId]) {
        state.chatHistory[friendId] = state.chatHistory[friendId].filter(
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
} = messageSlice.actions;

export default messageSlice.reducer;
