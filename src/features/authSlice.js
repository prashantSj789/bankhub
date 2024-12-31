import { createSlice } from "@reduxjs/toolkit";
import { login as loginService } from '../services/authService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: null,
      error: null,
      loading: false,
    },
  reducers: {
    loginStart: (state) => {
        state.loading = true;
        state.error = null;
      },
    loginSuccess: (state, action) => {
        state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user; 
      
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
      },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await loginService(credentials);
      dispatch(loginSuccess({ token: response.token, user: response.user }));
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed. Please try again.'));
    }
  };
export default authSlice.reducer;