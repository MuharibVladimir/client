import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { authSlice } from "./slices/AuthSlice";
import { IToken } from "../models/IToken";
import { Navigate, useNavigate } from "react-router-dom";

const baseUrl = `https://whiskey-collections-managment.onrender.com`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("u-access");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const accessToken = localStorage.getItem("u-access");
const refreshToken = localStorage.getItem("u-refresh");

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "token/refresh",
            method: "POST",
            body: {
              accessToken: localStorage.getItem("u-access"),
              refreshToken: localStorage.getItem("u-refresh"),
            } as IToken,
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(
            authSlice.actions.tokenReceived(refreshResult.data as IToken)
          );
          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authSlice.actions.logout());

          window.location.href = "/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  if (result.error && result.error.status === 403) {
    api.dispatch(authSlice.actions.logout());
    window.location.href = "/login";
  }

  return result;
};

export default customFetchBase;
