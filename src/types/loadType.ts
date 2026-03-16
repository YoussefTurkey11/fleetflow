import { Driver } from "./driverType";
import { ApiResponsePagination } from "./paginationType";
import { Truck } from "./truckType";

export type ApiResponseLoads = {
  data: Load[];
  meta: ApiResponsePagination;
};

export type ApiResponseLoad = {
  data: Load;
};

export type Load = {
  id: number;
  documentId: string;
  Route: string;
  Distance: string;
  PricePerMile: string;
  Total: string;
  Available: boolean;
  driver?: Driver;
  truck?: Truck;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TableLoadsProps = {
  loads?: ApiResponseLoads;
};

export type CreateLoad = {
  data: {
    Route: string;
    Distance: number;
    PricePerMile: number;
    Total: number;
    Available: boolean;
    driver?: {
      connect: number[];
    };
    truck?: {
      connect: number[];
    };
  };
};
