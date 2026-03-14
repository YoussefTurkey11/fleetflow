"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Box,
  Pencil,
  Search,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  ApiResponseLoad,
  ApiResponseLoads,
  TableLoadsProps,
} from "@/types/loadType";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Unavailable",
    value: "unavailable",
  },
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
type SortDirection = "asc" | "desc" | null;

export function TableLoads({ loads }: TableLoadsProps) {
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const rows = loads?.data ?? [];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedRows = React.useMemo(() => {
    if (!sortKey || !sortDirection) return rows;

    return [...rows].sort((a, b) => {
      let aValue: string | boolean | number;
      let bValue: string | boolean | number;

      if (sortKey === "id") {
        aValue = a.id;
        bValue = b.id;
      } else if (sortKey === "Route") {
        aValue = a.Route;
        bValue = b.Route;
      } else if (sortKey === "Available") {
        aValue = a.Available;
        bValue = b.Available;
      } else {
        aValue = a.HasNote;
        bValue = b.HasNote;
      }

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return sortDirection === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [rows, sortKey, sortDirection]);

  const getSortIcon = (columnKey: SortKey) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };
  return (
    <div className="w-full">
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
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs defaultValue="all" className="w-full md:w-max">
          <TabsList>
            {TABS.map(({ label, value }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={"cursor-pointer"}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full md:w-72">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Search" className="pl-9" />
        </div>
      </div>

      <div className="border-border mt-4 w-full overflow-hidden rounded-lg border">
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
                {
                  id,
                  Route,
                  Distance,
                  PricePerMile,
                  Total,
                  Available,
                  HasNote,
                },
                index,
              ) => {
                return (
                  <tr
                    key={index}
                    className="border-border border-b last:border-0"
                  >
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{id}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{Route}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{Distance}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {PricePerMile}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{Total}</span>
                      </div>
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
                );
              },
            )}
          </tbody>
        </table>
      </div>
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
