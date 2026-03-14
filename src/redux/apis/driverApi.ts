import {
  ApiResponseDriver,
  ApiResponseDrivers,
  Driver,
} from "@/types/driverType";
import { api } from "../baseApi";

export const driverApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Drivers
    allDrivers: builder.query<ApiResponseDrivers, void>({
      query: () => `/api/drivers?populate=*`,
      providesTags: [{ type: "Drivers", id: "LIST" }],
    }),

    // Single Driver
    singleDriver: builder.query<ApiResponseDriver, string>({
      query: (documentId) => `/api/drivers/${documentId}?populate=*`,
      providesTags: [{ type: "Drivers", id: "LIST" }],
    }),

    // Create Driver
    createDriver: builder.mutation<ApiResponseDriver, Driver>({
      query: (body) => ({
        url: `/api/drivers`,
        method: "POST",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),

    // Update Driver
    updateDriver: builder.mutation<
      ApiResponseDriver,
      { documentId: string; body: Partial<Driver> }
    >({
      query: ({ documentId, body }) => ({
        url: `/api/drivers/${documentId}`,
        method: "PUT",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),

    // Delete Driver
    deleteDriver: builder.mutation<ApiResponseDriver, string>({
      query: (documentId) => ({
        url: `/api/drivers/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),
  }),
});

export const {
  useAllDriversQuery,
  useSingleDriverQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApi;
