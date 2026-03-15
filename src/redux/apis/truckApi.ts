import { ApiResponseTruck, ApiResponseTrucks, Truck } from "@/types/truckType";
import { api } from "../baseApi";

export const truckApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // All Trucks
    allTrucks: builder.query<ApiResponseTrucks, void>({
      query: () => `/api/trucks?populate=*`,
      providesTags: [{ type: "Trucks", id: "LIST" }],
    }),

    // Single Truck
    singleTruck: builder.query<ApiResponseTruck, string>({
      query: (documentId) => `/api/trucks/${documentId}?populate=*`,
      providesTags: [{ type: "Trucks", id: "LIST" }],
    }),

    // Create Truck
    createTruck: builder.mutation<ApiResponseTruck, Truck>({
      query: (body) => ({
        url: `/api/trucks`,
        method: "POST",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Trucks", id: "LIST" }],
    }),

    // Update Truck
    updateTruck: builder.mutation<
      ApiResponseTruck,
      { documentId: string; body: Partial<Truck> }
    >({
      query: ({ documentId, body }) => ({
        url: `/api/trucks/${documentId}`,
        method: "PUT",
        body: { data: body },
      }),
      invalidatesTags: [{ type: "Trucks", id: "LIST" }],
    }),

    // Delete Truck
    deleteTruck: builder.mutation<ApiResponseTruck, string>({
      query: (documentId) => ({
        url: `/api/trucks/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Trucks", id: "LIST" }],
    }),
  }),
});

export const {
  useAllTrucksQuery,
  useSingleTruckQuery,
  useCreateTruckMutation,
  useUpdateTruckMutation,
  useDeleteTruckMutation,
} = truckApi;
