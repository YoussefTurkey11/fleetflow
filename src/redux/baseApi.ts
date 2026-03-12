import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
  }),
  tagTypes: ["Auth"],
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
