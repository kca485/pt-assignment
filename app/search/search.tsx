import { Form, useLocation, useNavigation } from "react-router";
import type { Route } from "./+types/search";
import { SearchPagination } from "./search-pagination";

interface ArticleDTO {
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
interface ArticleList {
  data: ArticleDTO[];
  hits: number;
  offset: number;
}

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<ArticleList> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q) {
    return { data: [], hits: 0, offset: 0 };
  }
  const page = url.searchParams.get("page") ?? "0";
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}?q=${q}` +
      `&page=${page}` +
      "&fq=-typeOfMaterials:Archives" +
      `&api-key=${import.meta.env.VITE_API_KEY}`,
  );
  const json = await res.json();
  if (json.fault) {
    throw Error(json.fault.faultstring);
  }
  return {
    data: json.response?.docs ?? [],
    hits: json.response?.metadata?.hits,
    offset: json.response?.metadata?.offset,
  };
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q") ?? "";
  const currentPageIndex = parseInt(searchParams.get("page") ?? "0");

  return (
    <main>
      <h1>Welcome</h1>
      <Form>
        <search>
          <label htmlFor="q">Search</label>
          <input id="q" name="q" defaultValue={q} />
        </search>
        <input type="hidden" name="page" value="0" />
        <button>Submit</button>
      </Form>
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <ul>
            {loaderData.data.map((item) => (
              <li key={item._id} className="border">
                <p className="font-bold">{item.headline.main}</p>
                <p>{item.byline.original || item.source}</p>
                <p>{item.pub_date}</p>
                <p>{item.snippet}</p>
                <a
                  href={item.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </li>
            ))}
          </ul>
          {Boolean(loaderData.data.length) && (
            <SearchPagination
              q={q}
              currentPageIndex={currentPageIndex}
              hits={loaderData.hits}
              offset={loaderData.offset}
            />
          )}
        </>
      )}
    </main>
  );
}
