import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.mode === "light"
        ? (state.mode = "dark")
        : (state.mode = "light");
    },
  },
});

//actions
export const { changeTheme } = themeSlice.actions;

//selectors
export const selectorDarkMode = (state) => state.theme.mode;

//reducer
const themeReducer = themeSlice.reducer;
export default themeReducer;
