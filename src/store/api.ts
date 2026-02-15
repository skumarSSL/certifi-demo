import { AppUrl } from "@/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: AppUrl }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({}),
});

export const {} = api;
