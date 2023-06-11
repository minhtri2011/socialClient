import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import ThunkMiddleware from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./slice/postSlice";
import friendReducer from "./slice/friendSlice";
import themeReducer from "./slice/themeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","theme"],
};
const rootReducer = combineReducers({
  theme:themeReducer,
  auth: authReducer,
  posts: postReducer,
  friends: friendReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [ThunkMiddleware],
});

const persistor = persistStore(store);
export { store, persistor };
