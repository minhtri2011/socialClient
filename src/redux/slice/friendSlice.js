import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRemoveFriendByUserId, getFriendByUserId } from "../../api/user";

export const getFriends = createAsyncThunk("friend/get", async ({id, token}) => {
  try {
    const response = await getFriendByUserId(id, token);
    return response;
  } catch (error) {
    throw error;
  }
});
export const addRemoveFriend = createAsyncThunk("friend/addRemove", async ({id, friendId, token}) => {
  try {
    const response = await addRemoveFriendByUserId(id, friendId, token);
    return response;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  friends: null,
  isLoading: false,
  error: null,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //get friend from server
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFriends.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.friends = payload;
      })
      .addCase(getFriends.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
        state.friends = null;
      })

      //add remove friend 
      .addCase(addRemoveFriend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRemoveFriend.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.friends = payload;
      })
      .addCase(addRemoveFriend.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
        state.friends = null;
      });
  },
});

export const {} = friendSlice.actions;

export default friendSlice.reducer;
