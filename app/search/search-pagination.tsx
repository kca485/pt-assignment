import { Link } from "react-router";

interface PaginationProps {
  hits: number;
  offset: number;
  currentPageIndex: number;
  q: string;
}
export function SearchPagination({
  q,
  hits,
  offset,
  currentPageIndex,
}: PaginationProps) {
  return (
    <div>
      {currentPageIndex < 1 || (
        <Link
          to={{
            pathname: "/",
            search: `?q=${q}&page=${Math.max(currentPageIndex - 1, 0)}`,
          }}
        >
          Prev
        </Link>
      )}
      Page {currentPageIndex + 1}
      {hits - offset <= 10 || (
        <Link
          to={{
            pathname: "/",
            search: `?q=${q}&page=${Math.min(currentPageIndex + 1, 9)}`,
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
}
