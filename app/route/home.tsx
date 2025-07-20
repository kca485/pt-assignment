import { Search, type ArticleList } from "@/components/feature/search/search";
import type { Route } from "./+types/home";

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

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Search data={loaderData} />;
}
