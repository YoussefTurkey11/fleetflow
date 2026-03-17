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
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { User } from "@/types/authType";
import ActionUser from "./ActionUser";

const TABS = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Blocked", value: "blocked" },
];

const TABLE_HEAD = [
  "User Id",
  "username",
  "email",
  "Phone",
  "confirmed",
  "blocked",
  "Action",
];

type SortKey = "id" | "username" | "email";

export function TableUsers({
  users,
  isFetching,
}: {
  users: User[];
  isFetching: boolean;
}) {
  const rows = users ?? [];
  const skeletonRows = Array.from({ length: 3 });
  const pathname = usePathname();

  /* ---------------- search ---------------- */

  const { search, setSearch, filteredRowsSearch } = useTableSearch(rows, [
    "username",
    "email",
    "id",
  ]);

  /* ---------------- filter ---------------- */

  const { filter, setFilter, filteredRowsFilter } = useTableFilter(
    filteredRowsSearch,
    (row, filter) => {
      if (filter === "confirmed") return row.confirmed;
      if (filter === "blocked") return row.blocked;
      return true;
    },
  );

  /* ---------------- sort ---------------- */

  const { sortedRows, handleSort, sortKey, sortDirection } =
    useTableSort<User>(filteredRowsFilter);

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
          <h6 className="text-base font-semibold">Users list</h6>
          <p className="text-muted-foreground mt-1 text-sm">
            See information about all Users
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {pathname.startsWith("/admin") && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/users">View all</Link>}
            />
          )}
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
                  "username",
                  "email",
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
                  ({
                    id,
                    documentId,
                    username,
                    Phone,
                    email,
                    confirmed,
                    blocked,
                  }) => (
                    <tr
                      key={id}
                      className="border-border border-b last:border-0"
                    >
                      <td className="p-3">{id}</td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/images/driver.png"}
                            width={20}
                            height={20}
                            alt={`${username} avatar`}
                            loading="lazy"
                          />
                          <span className="truncate">{username}</span>
                        </div>
                      </td>

                      <td className="p-3">{email}</td>

                      <td className="p-3">{Phone ?? "--"}</td>

                      <td className="p-3">
                        <Badge variant={confirmed ? "default" : "destructive"}>
                          {confirmed ? "Confirmed" : "Unconfirmed"}
                        </Badge>
                      </td>

                      <td className="p-3">
                        <Badge variant={blocked ? "destructive" : "default"}>
                          {blocked ? "Blocked" : "Unblocked"}
                        </Badge>
                      </td>

                      <td className="p-3">
                        <ActionUser
                          user={{
                            id,
                            documentId,
                            username,
                            Phone,
                            email,
                            confirmed,
                            blocked,
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
