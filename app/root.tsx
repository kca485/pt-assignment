import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "./context/theme";
import { ThemeToggle } from "./components/feature/theme/theme-toggle";
import { H1 } from "./components/ui/typography";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>News Search</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="flex h-screen justify-center items-center">loading...</div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <header className="p-8 max-w-[80ch] m-auto">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          News Search
        </h1>
      </header>
      <main className="p-8 max-w-[80ch] m-auto space-y-4">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message.startsWith("Rate limit quota violation")
      ? "There were too many searches. Please wait a bit and try again."
      : error.message;
    stack = error.message.startsWith("Rate limit quota violation")
      ? undefined
      : error.stack;
  }

  const isOverlimit = details.startsWith("Rate limit quota violation");
  if (isOverlimit) {
    details = "There were too many searches. Please wait a bit and try again.";
    stack = undefined;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <Link to="/" className="underline">
        Home
      </Link>
      <H1 className="py-4">{message}</H1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
