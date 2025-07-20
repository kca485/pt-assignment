import { Form, useLocation, useNavigation } from "react-router";
import { SearchPagination } from "./search-pagination";
import { SearchResult } from "./search-result";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ArticleDTO {
  _id: string;
  byline: {
    original: string;
  };
  headline: {
    main: string;
  };
  pub_date: string;
  web_url: string;
  snippet: string;
  source: string;
}

export interface ArticleList {
  data: ArticleDTO[];
  hits: number;
  offset: number;
}

interface SearchProps {
  data: ArticleList;
}

export function Search({ data }: SearchProps) {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q") ?? "";
  const currentPageIndex = parseInt(searchParams.get("page") ?? "0");

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
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <SearchResult data={data.data} />
          {Boolean(data.data.length) && (
            <SearchPagination
              q={q}
              currentPageIndex={currentPageIndex}
              hits={data.hits}
              offset={data.offset}
            />
          )}
        </>
      )}
    </>
  );
}
