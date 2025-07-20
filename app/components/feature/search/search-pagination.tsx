import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useSearchArticles } from "@/api/article";

export function SearchPagination() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q") ?? "";
  const currentPageIndex = parseInt(searchParams.get("page") ?? "0");

  const { data } = useSearchArticles(location.search);
  const hits = data?.hits ?? 0;
  const offset = data?.offset ?? 0;

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
