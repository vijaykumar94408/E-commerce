import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  showPopup: boolean;
}

const initialState: ChatbotState = {
  isOpen: false,
  messages: [],
  showPopup: true
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setShowPopup: (state, action: PayloadAction<boolean>) => {
      state.showPopup = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { toggleChat, addMessage, setShowPopup, clearMessages } = chatbotSlice.actions;
export default chatbotSlice.reducer;