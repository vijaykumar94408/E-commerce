import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginPayload>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.error = null;
    },
    signupUser: (state, action: PayloadAction<SignupPayload>) => {
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        email: action.payload.email
      };
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  }
});

export const { loginUser, signupUser, logout } = authSlice.actions;
export default authSlice.reducer;