import { useQuery } from "@tanstack/react-query";

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

async function searchArticles(searchParams: string): Promise<ArticleList> {
  const urlSearchParams = new URLSearchParams(searchParams);
  const q = urlSearchParams.get("q");
  if (!q) {
    return { data: [], hits: 0, offset: 0 };
  }
  const page = urlSearchParams.get("page") ?? "0";
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

export function searchArticlesQuery(searchParams: string) {
  return {
    queryKey: ["search-articles", searchParams],
    queryFn: () => searchArticles(searchParams),
  };
}

export function useSearchArticles(searchParams: string) {
  return useQuery(searchArticlesQuery(searchParams));
}
