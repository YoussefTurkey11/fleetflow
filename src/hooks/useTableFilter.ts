import { useMemo, useState } from "react";

export function useTableFilter<T>(
  rows: T[],
  filterFn: (row: T, filter: string) => boolean,
) {
  const [filter, setFilter] = useState("all");

  const filteredRowsFilter = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((row) => filterFn(row, filter));
  }, [rows, filter, filterFn]);

  return {
    filter,
    setFilter,
    filteredRowsFilter,
  };
}
