import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/search";

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

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<ArticleDTO[]> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  if (!q) {
    return [];
  }
  const res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}` +
      "&api-key=YDaPV33pxvNSNy8MBahZ9GLuOvzOrZGn",
  );
  const json = await res.json();
  if (json.fault) {
    throw Error(json.fault.faultstring);
  }
  return json.response?.docs ?? [];
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);

  return (
    <main>
      <h1>Welcome</h1>
      <Form>
        <search>
          <label htmlFor="q">Search</label>
          <input id="q" name="q" />
        </search>
        <button>Submit</button>
      </Form>
      {isLoading ? (
        "loading..."
      ) : (
        <ul>
          {loaderData.map((item) => (
            <li key={item._id}>::: {item.byline.original || item.source}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
