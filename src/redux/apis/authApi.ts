import { ApiResponse, EmailResponse } from "@/types/authType";
import { api } from "../baseApi";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<
      ApiResponse,
      { identifier: string; password: string }
    >({
      query: (body) => ({
        url: `/api/auth/local`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),

    // Register
    register: builder.mutation<
      ApiResponse,
      { username: string; email: string; password: string }
    >({
      query: (body) => ({
        url: `/api/auth/local/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<EmailResponse, { email: string }>({
      query: (body) => ({
        url: `/api/auth/forgot-password`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),

    // Reset Password
    resetPassword: builder.mutation<
      ApiResponse,
      { code: string; password: string; passwordConfirmation: string }
    >({
      query: (body) => ({
        url: `/api/auth/reset-password`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
