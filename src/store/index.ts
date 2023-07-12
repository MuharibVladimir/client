import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/UserService";
import { authApi } from "../services/AuthService";
import { authReducer } from "./slices/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore["dispatch"];
