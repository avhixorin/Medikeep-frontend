import { AIChatMessage, AiChatThread } from "@/components/Dashboard/Records/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const getInitialState = (): AiChatThread => ({
  _id: uuid(),
  title: "New Chat",
  chatThread: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const aiChatSlice = createSlice({
  name: "aiChat",
  initialState: getInitialState(),
  reducers: {
    /**
     * Resets the chat state to its initial values for a new conversation.
     */
    startNewChat: () => {
      return getInitialState();
    },

    /**
     * Sets the title of the current chat.
     */
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },

    /**
     * Adds a new message to the chat thread and updates the timestamp.
     * The payload is the AIChatMessage object itself.
     */
    addMessage: (state, action: PayloadAction<AIChatMessage>) => {
      state.chatThread.push(action.payload);
      state.updatedAt = new Date().toISOString();
    },
  },
});

export const { startNewChat, setTitle, addMessage } = aiChatSlice.actions;

export default aiChatSlice.reducer;