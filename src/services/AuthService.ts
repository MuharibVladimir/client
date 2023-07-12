import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "../models/IAuth";
import customFetchBase from "../store/customFetchBase";
import { IUserForRegistration } from "../models/IUserForRegistration";
import { IAuthResponse } from "../models/IAuthResponse";

const userId = localStorage.getItem("u-userId");

export const authApi = createApi({
  reducerPath: "authentication",
  baseQuery: customFetchBase,
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    register: build.mutation<any, IUserForRegistration>({
      query: (user) => ({
        url: `authentication/registration`,
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation<IAuthResponse, IAuth>({
      query: (user) => ({
        url: `authentication/login`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
