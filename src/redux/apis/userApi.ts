import { UpdateUserPayload, User } from "@/types/authType";
import { api } from "../baseApi";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Users
    allUsers: builder.query<User[], void>({
      query: () => `/api/users`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),

    // Single User
    singleUser: builder.query<User, void>({
      query: (id) => `{{strapi}}/api/users/${id}`,
      providesTags: [{ type: "Users", id: "LIST" }],
    }),

    // Me
    me: builder.query<User, void>({
      query: () => `/api/users/me`,
      providesTags: [{ type: "Users", id: "LIST" }],
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

    // Delete User
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
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
  useDeleteUserMutation,
} = userApi;
