"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Box,
  Pencil,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Load, TableLoadsProps } from "@/types/loadType";
import { useTableSort } from "@/hooks/useTableSort";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useTableFilter } from "@/hooks/useTableFilter";

const TABS = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
];

const TABLE_HEAD = [
  "Load Id",
  "Routes",
  "Distance",
  "Price/Mile",
  "Total",
  "Available",
  "HasNote",
  "Action",
];

type SortKey = "id" | "Route" | "Available" | "HasNote";

export function TableLoads({ loads }: TableLoadsProps) {
  const rows = loads?.data ?? [];

  // Search Hook
  const { search, setSearch, filteredRowsSearch } = useTableSearch(rows, [
    "Route",
    "id",
  ]);

  // Filter Hook
  const { filter, setFilter, filteredRowsFilter } = useTableFilter(
    filteredRowsSearch,
    (row, filter) => {
      if (filter === "available") return row.Available;
      if (filter === "unavailable") return !row.Available;
      return true;
    },
  );

  // Sort Hook
  const { sortedRows, handleSort, sortKey, sortDirection } =
    useTableSort<Load>(filteredRowsFilter);

  // Sort icon helper
  const getSortIcon = (columnKey: SortKey) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h6 className="text-base font-semibold">Loads list</h6>
          <p className="text-muted-foreground mt-1 text-sm">
            See information about all loads
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm">
            View all
          </Button>
          <Button size="sm">
            <Box className="mr-2 h-4 w-4" />
            Add Load
          </Button>
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
      <div className="border-border mt-4 w-full overflow-x-scroll rounded-lg border">
        <table className="w-full">
          <thead className="border-border bg-muted border-b text-sm font-medium">
            <tr>
              {TABLE_HEAD.map((head, index) => {
                const sortKeys: (SortKey | null)[] = [
                  "id",
                  "Route",
                  "Available",
                  "HasNote",
                  null,
                ];
                const key = sortKeys[index];
                return (
                  <th
                    key={head}
                    className={`px-2.5 py-2 text-start font-medium ${key ? "hover:bg-muted/80 cursor-pointer" : ""}`}
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
            {sortedRows.map(
              (
                { id, Route, Distance, PricePerMile, Total, Available },
                index,
              ) => (
                <tr
                  key={index}
                  className="border-border border-b last:border-0"
                >
                  <td className="p-3">
                    <span className="text-sm font-medium">{id}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium truncate">
                      {Route}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium">{Distance}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium">{PricePerMile}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium">{Total}</span>
                  </td>
                  <td className="p-3">
                    <Badge variant={Available ? "default" : "destructive"}>
                      {Available ? "Available" : "Unavailable"}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant={Available ? "default" : "secondary"}>
                      {Available ? "Has Note" : "No Note"}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <TooltipContent>
                          <p>Edit Load</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (static for now) */}
      <div className="border-border flex items-center justify-between border-t py-4">
        <span className="text-muted-foreground text-sm">Page 1 of 10</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
