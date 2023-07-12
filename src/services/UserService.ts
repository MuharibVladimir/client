import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../store/customFetchBase";
import { IUser } from "../models/IUser";
import { IForecast } from "../models/IForecast";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: customFetchBase,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], number>({
      query: (limit = 5) => `users?limit=${limit}`,
      providesTags: ["Users"],
    }),
    getForecast: build.query<IForecast[], any>({
      query: () => `WeatherForecast`,
    }),
    deleteUsers: build.mutation<IUser, string[]>({
      query: (ids) => ({
        url: `users/${localStorage.getItem("u-userId")}`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["Users"],
    }),
    banUser: build.mutation<void, string[]>({
      query: (ids) => ({
        url: `users/${localStorage.getItem("u-userId")}`,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["Users"],
    }),
    unBanUser: build.mutation<void, string[]>({
      query: (ids) => ({
        url: `users/blocked`,
        method: "POST",
        body: ids,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUsersMutation,
  useUnBanUserMutation,
  useBanUserMutation,
  useGetForecastQuery,
} = userApi;
