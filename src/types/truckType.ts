import { ApiResponsePagination } from "./paginationType";

export type ApiResponseTrucks = {
  data: Truck[];
  meta: ApiResponsePagination;
};

export type ApiResponseTruck = {
  data: Truck;
};

export type Truck = {
  id?: number;
  documentId?: string;
  FuelPerMile: string;
  TotalMileage: string;
  Available: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TableTrucksProps = {
  trucks?: ApiResponseTrucks;
};

export type CreateTruck = {
  FuelPerMile: string;
  TotalMileage: string;
  Available: boolean;
};
