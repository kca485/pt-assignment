import { Form, useLocation } from "react-router";
import { SearchPagination } from "./search-pagination";
import { SearchResult } from "./search-result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q") ?? "";

  return (
    <>
      <Form className="flex items-end gap-x-2">
        <search className="grow space-y-2">
          <Label htmlFor="q">What are you looking for?</Label>
          <Input id="q" name="q" defaultValue={q} />
        </search>
        <input type="hidden" name="page" value="0" />
        <Button>Search</Button>
      </Form>
      <SearchResult />
      <SearchPagination />
    </>
  );
}
