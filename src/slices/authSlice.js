import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authState');
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user || null;
      localStorage.setItem('authState', JSON.stringify({
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user || null
      }));
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;