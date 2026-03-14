import { useMemo, useState } from "react";

export function useTablePagination<T>(rows: T[], pageSize = 10) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(rows.length / pageSize);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page, pageSize]);

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, pageCount));
  };

  const prevPage = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  return {
    page,
    pageCount,
    paginatedRows,
    nextPage,
    prevPage,
    setPage,
  };
}
