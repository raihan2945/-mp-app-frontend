import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import apiConnection from "./features/api";
import authSlice from "./features/auth/authSlice";
import userSlice from "./features/user/userSlice";

// import cartReducer from './features/cart/cartSlice';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootReducer = combineReducers({
  [apiConnection.reducerPath]: apiConnection.reducer,
  auth: persistReducer(persistConfig, authSlice),
  user: userSlice,
  //   user: cartReducer,
});

export default rootReducer;
