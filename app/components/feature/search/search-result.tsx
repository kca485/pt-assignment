import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ArticleDTO } from "./search";
import { Button } from "@/components/ui/button";

interface SearchResultProps {
  data: ArticleDTO[];
}
export function SearchResult({ data }: SearchResultProps) {
  return (
    <ul className="flex flex-col gap-y-4">
      {data.map((item) => (
        <li key={item._id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">
                {item.headline.main}
              </CardTitle>
              <CardDescription>
                <p>{item.byline.original || item.source}</p>
              </CardDescription>
              <CardAction>
                <Button variant="link" asChild>
                  <a
                    href={item.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>{item.snippet}</p>
            </CardContent>
            <CardFooter>
              <small>{new Date(item.pub_date).toDateString()}</small>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
