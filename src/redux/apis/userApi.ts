import { UpdateUserPayload, User } from "@/types/authType";
import { api } from "../baseApi";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Users
    allUsers: builder.query<User[], void>({
      query: () => `/api/users`,
      providesTags: ["Users"],
    }),

    // Single User
    singleUser: builder.query<User, void>({
      query: (id) => `{{strapi}}/api/users/${id}`,
      providesTags: ["Users"],
    }),

    // Me
    me: builder.query<User, void>({
      query: () => `/api/users/me`,
      providesTags: ["Users"],
    }),

    // Udpate User
    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: ({ id, body }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useSingleUserQuery,
  useMeQuery,
  useLazyMeQuery,
  useUpdateUserMutation,
} = userApi;
