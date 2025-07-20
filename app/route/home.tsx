import { Search } from "@/components/feature/search/search";
import type { Route } from "./+types/home";
import { queryClient } from "@/lib/queryClient";
import { searchArticlesQuery, type ArticleList } from "@/api/article";

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<ArticleList> {
  const url = new URL(request.url);
  return queryClient.ensureQueryData(
    searchArticlesQuery(url.searchParams.toString()),
  );
}

export default function Home() {
  return <Search />;
}
