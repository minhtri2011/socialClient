import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostsApi, getPostsByUserIdApi } from "../../api/post";

export const getPosts = createAsyncThunk("posts/get", async (token) => {
  try {
    const response = await getPostsApi(token);
    return response;
  } catch (error) {
    throw error;
  }
});
export const getPostsByUserId = createAsyncThunk(
  "posts/getByUserId",
  async ({id, token}) => {
    try {
      const response = await getPostsByUserIdApi(id, token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  posts: null,
  isLoading: false,
  error: null,
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts = [...state.posts, payload];
    },
    removePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
    likePostAction: (state, { payload }) => {
      const { id, userId } = payload;
      const postIndex = state.posts.findIndex((post) => post._id === id);
      const findLikeInPost = state.posts[postIndex].likes.includes(userId);

      if (findLikeInPost) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
          (like) => like !== userId
        );
      } else state.posts[postIndex].likes.push(userId);
    },
    addComment: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post._id === payload);
      state.posts[index].comments++;
    },
    removeComment: (state, { payload }) => {
      const index = state.posts.findIndex((post) => post._id === payload);
      state.posts[index].comments--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.posts = null;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.posts = payload;
      })
      .addCase(getPosts.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
        state.posts = null;
      })

      .addCase(getPostsByUserId.pending, (state) => {
        state.isLoading = true;
        state.posts = null;
        state.error = null;
      })
      .addCase(getPostsByUserId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.posts = payload;
      })
      .addCase(getPostsByUserId.rejected, (state, { error }) => {
        state.isLoading = false;
        state.posts = null;
        state.error = error.message;
      });
  },
});

export const {
  addPost,
  removePost,
  likePostAction,
  addComment,
  removeComment,
} = posts.actions;

const postReducer = posts.reducer;
export default postReducer;
