import { useMemo, useState } from "react";

export function useTableSearch<T>(rows: T[], keys: (keyof T)[]) {
  const [search, setSearch] = useState("");

  const filteredRowsSearch = useMemo(() => {
    if (!search) return rows;

    const lower = search.toLowerCase();

    return rows.filter((row) =>
      keys.some((key) => {
        const value = row[key];

        if (typeof value === "string") {
          return value.toLowerCase().includes(lower);
        }

        if (typeof value === "number") {
          return value.toString().includes(lower);
        }

        return false;
      }),
    );
  }, [rows, search, keys]);

  return {
    search,
    setSearch,
    filteredRowsSearch,
  };
}
