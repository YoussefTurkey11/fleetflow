import {
  ApiResponseLoad,
  ApiResponseLoads,
  CreateLoad,
  Load,
} from "@/types/loadType";
import { api } from "../baseApi";

export const loadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Loads
    allLoads: builder.query<ApiResponseLoads, void>({
      query: () => `/api/loads?populate=*`,
      providesTags: [{ type: "Loads", id: "LIST" }],
    }),

    // Single Load
    singleLoad: builder.query<ApiResponseLoad, string>({
      query: (documentId) => `/api/loads/${documentId}?populate=*`,
      providesTags: [{ type: "Loads", id: "LIST" }],
    }),

    // Create Load
    createLoad: builder.mutation<ApiResponseLoad, CreateLoad>({
      query: (body) => ({
        url: `/api/loads`,
        method: "POST",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Loads", id: "LIST" }],
    }),

    // Update Load
    updateLoad: builder.mutation<
      ApiResponseLoad,
      { documentId: string; body: Partial<Load> }
    >({
      query: ({ documentId, body }) => ({
        url: `/api/loads/${documentId}`,
        method: "PUT",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Loads", id: "LIST" }],
    }),

    // Delete Load
    deleteLoad: builder.mutation<ApiResponseLoad, string>({
      query: (documentId) => ({
        url: `/api/loads/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Loads", id: "LIST" }],
    }),
  }),
});

export const {
  useAllLoadsQuery,
  useSingleLoadQuery,
  useCreateLoadMutation,
  useUpdateLoadMutation,
  useDeleteLoadMutation,
} = loadApi;
