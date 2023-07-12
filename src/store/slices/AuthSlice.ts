import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import jwt from "jwt-decode";
import { RootState } from "..";
import { IToken } from "../../models/IToken";

interface AuthState {
  isAuth: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface ITokenPayload {
  id: string;
}

const ACCESS_KEY = "u-access";
const REFRESH_KEY = "u-refresh";
const USER_ID_KEY = "u-userId";

const initialState: AuthState = {
  accessToken: localStorage.getItem(ACCESS_KEY) ?? "",
  refreshToken: localStorage.getItem(REFRESH_KEY) ?? "",
  userId: localStorage.getItem(USER_ID_KEY) ?? "",
  isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
};

interface AuthPayload {
  accessToken: string;
  refreshToken: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.userId = "";
      state.isAuth = false;

      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    },
    loginUser(state, action: PayloadAction<AuthPayload>) {
      const decodedToken: ITokenPayload = jwt(action.payload.accessToken);

      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = decodedToken.id;
      state.isAuth = Boolean(action.payload.accessToken);

      localStorage.setItem(ACCESS_KEY, action.payload.accessToken);
      localStorage.setItem(REFRESH_KEY, action.payload.refreshToken);
      localStorage.setItem(USER_ID_KEY, decodedToken.id);
    },
    tokenReceived(state, action: PayloadAction<IToken>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = Boolean(action.payload.accessToken);

      localStorage.setItem(ACCESS_KEY, action.payload.accessToken);
      localStorage.setItem(REFRESH_KEY, action.payload.refreshToken);
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.userId;
