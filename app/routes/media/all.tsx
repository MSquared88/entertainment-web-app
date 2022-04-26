import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//db
import { getMediaListItems } from "~/models/media.server";

//components
import { SearchForm } from "~/components/searchForm";
import ListOfMediaDisplay from "~/components/listOfMedia";

type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const mediaListItems = await getMediaListItems();
  return json<LoaderData>({ mediaListItems });
};

export default function MediaPage() {
  const { mediaListItems } = useLoaderData() as LoaderData;

  return (
    <div className="flex h-[88%] flex-col bg-blue-dark">
      <SearchForm placeHolder={"Search for movies or TV series"} />
      <main className=" h-full bg-blue-dark">
        <ListOfMediaDisplay mediaListItems={mediaListItems}>
          <div>trending</div>
          <div>recomened</div>
        </ListOfMediaDisplay>
      </main>
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="bg-pink-200 text-red">
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
