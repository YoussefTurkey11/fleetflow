import { ApiResponsePagination } from "./paginationType";

export type ApiResponseTrucks = {
  data: Truck[];
  meta: ApiResponsePagination;
};

export type ApiResponseTruck = {
  data: Truck;
};

export type Truck = {
  id: number;
  documentId: string;
  FuelPerMile: number;
  TotalMileage: number;
  Available: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
