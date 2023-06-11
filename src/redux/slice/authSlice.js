import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/auth";

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await login(userData);
    return response;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});

export const { logout } = authSlice.actions;

const userReducer = authSlice.reducer;
export default userReducer;
