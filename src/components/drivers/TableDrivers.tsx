"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTableSort } from "@/hooks/useTableSort";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTablePagination } from "@/hooks/useTablePagination";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApiResponseDrivers, Driver } from "@/types/driverType";
import ActionDriver from "./ActionDriver";
import { AddDriver } from "./AddDriver";
import Image from "next/image";

const TABS = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
];

const TABLE_HEAD = [
  "Driver Id",
  "DriverDetails",
  "PhoneNumber",
  "License",
  "PricePerMile",
  "HireDate",
  "Available",
  "Action",
];

type SortKey = "id" | "PhoneNumber" | "Available";

export function TableDrivers({
  drivers,
  isFetching,
}: {
  drivers: ApiResponseDrivers | undefined;
  isFetching: boolean;
}) {
  const rows = drivers?.data ?? [];
  const skeletonRows = Array.from({ length: 3 });
  const pathname = usePathname();

  /* ---------------- search ---------------- */

  const { search, setSearch, filteredRowsSearch } = useTableSearch(rows, [
    "PhoneNumber",
    "DriverDetails",
    "id",
  ]);

  /* ---------------- filter ---------------- */

  const { filter, setFilter, filteredRowsFilter } = useTableFilter(
    filteredRowsSearch,
    (row, filter) => {
      if (filter === "available") return row.Available;
      if (filter === "unavailable") return !row.Available;
      return true;
    },
  );

  /* ---------------- sort ---------------- */

  const { sortedRows, handleSort, sortKey, sortDirection } =
    useTableSort<Driver>(filteredRowsFilter);

  /* ---------------- pagination ---------------- */

  const { paginatedRows, page, pageCount, nextPage, prevPage } =
    useTablePagination(sortedRows, 8);

  /* ---------------- helpers ---------------- */

  const getSortIcon = (columnKey: SortKey) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-4 w-4" />;

    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;

    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h6 className="text-base font-semibold">Drivers list</h6>
          <p className="text-muted-foreground mt-1 text-sm">
            See information about all Drivers
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {pathname.startsWith("/admin") && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/drivers">View all</Link>}
            />
          )}

          <AddDriver />
        </div>
      </div>

      {/* Tabs + Search */}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs
          value={filter}
          onValueChange={setFilter}
          className="w-full md:w-max"
        >
          <TabsList>
            {TABS.map(({ label, value }) => (
              <TabsTrigger key={value} value={value} className="cursor-pointer">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

          <Input
            placeholder="Search"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border-border mt-4 w-full overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="border-border bg-muted border-b text-sm font-medium">
            <tr>
              {TABLE_HEAD.map((head, index) => {
                const sortKeys: (SortKey | null)[] = [
                  "id",
                  "PhoneNumber",
                  "Available",
                  null,
                ];

                const key = sortKeys[index];

                return (
                  <th
                    key={head}
                    className={`px-2.5 py-2 text-start font-medium ${
                      key ? "hover:bg-muted/80 cursor-pointer" : ""
                    }`}
                    onClick={() => key && handleSort(key)}
                  >
                    <div className="text-muted-foreground flex items-center justify-between gap-2">
                      {head}
                      {key && getSortIcon(key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="text-sm">
            {isFetching
              ? skeletonRows.map((_, i) => (
                  <tr key={i} className="border-border border-b">
                    <td className="p-3">
                      <Skeleton className="h-4 w-10" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-4 w-32" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-4 w-16" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-4 w-20" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-4 w-20" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </td>

                    <td className="p-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </td>
                  </tr>
                ))
              : paginatedRows.map(
                  (
                    {
                      id,
                      documentId,
                      DriverDetails,
                      PhoneNumber,
                      License,
                      PricePerMile,
                      HireDate,
                      Available,
                    },
                    index,
                  ) => (
                    <tr
                      key={index}
                      className="border-border border-b last:border-0"
                    >
                      <td className="p-3">{id}</td>

                      <td className="p-3 flex items-center gap-2">
                        <Image
                          src={"/images/driver.png"}
                          width={20}
                          height={20}
                          alt={DriverDetails}
                          loading="lazy"
                        />
                        <span className="truncate">{DriverDetails}</span>
                      </td>

                      <td className="p-3">{PhoneNumber}</td>

                      <td className="p-3">{License}</td>

                      <td className="p-3 font-semibold">${PricePerMile}</td>

                      <td className="p-3">
                        <Badge variant={"secondary"}>{HireDate}</Badge>
                      </td>

                      <td className="p-3">
                        <Badge variant={Available ? "default" : "destructive"}>
                          {Available ? "Available" : "Unavailable"}
                        </Badge>
                      </td>

                      <td className="p-3">
                        <ActionDriver
                          driver={{
                            id,
                            documentId,
                            DriverDetails,
                            PhoneNumber,
                            License,
                            PricePerMile,
                            HireDate,
                            Available,
                          }}
                        />
                      </td>
                    </tr>
                  ),
                )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="border-border flex items-center justify-between border-t py-4">
        <span className="text-muted-foreground text-sm">
          Page {page} of {pageCount}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={page === 1}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
