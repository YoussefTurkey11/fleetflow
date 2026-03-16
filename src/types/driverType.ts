import { ApiResponsePagination } from "./paginationType";

export type ApiResponseDrivers = {
  data: Driver[];
  meta: ApiResponsePagination;
};

export type ApiResponseDriver = {
  data: Driver;
};

export type Driver = {
  id: number;
  documentId?: string;
  DriverDetails: string;
  PhoneNumber: string;
  License: string;
  PricePerMile: string;
  HireDate: string;
  Available: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TableDriversProps = {
  drivers?: ApiResponseDrivers;
};

export type CreateDriver = {
  DriverDetails: string;
  PhoneNumber: string;
  License: string;
  PricePerMile: string;
  HireDate: string;
  Available: boolean;
};
