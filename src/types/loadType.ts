import { ApiResponsePagination } from "./paginationType";

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
  Distance: number;
  PricePerMile: number;
  Total: number;
  Available: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type TableLoadsProps = {
  loads?: ApiResponseLoads;
};

export type CreateLoad = {
  Route: string;
  Distance: string;
  PricePerMile: string;
  Total: string;
  Available: boolean;
};
