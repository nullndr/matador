import type { LinksFunction } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { ErrorFallback } from "~/lib/matador/components/error";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/matador.png",
      type: "image/png",
    },
  ];
};

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {`${caught.status} ${caught.statusText}`}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl text-right mx-auto py-6 sm:px-6 lg:px-8">
          <p className="font-semibold">{caught.data}</p>
        </div>
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const caught = useCatch();

  return <ErrorFallback error={caught} />;
}
