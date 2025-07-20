import { Link } from "react-router";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-x-4 items-center">
      {currentPageIndex < 1 || (
        <Button variant="link" asChild>
          <Link
            to={{
              pathname: "/",
              search: `?q=${q}&page=${Math.max(currentPageIndex - 1, 0)}`,
            }}
          >
            prev
          </Link>
        </Button>
      )}
      <p>Page {currentPageIndex + 1}</p>
      {hits - offset <= 10 || (
        <Button variant="link" asChild>
          <Link
            to={{
              pathname: "/",
              search: `?q=${q}&page=${Math.min(currentPageIndex + 1, 9)}`,
            }}
          >
            next
          </Link>
        </Button>
      )}
    </div>
  );
}
