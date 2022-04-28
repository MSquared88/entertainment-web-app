import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//db
import { getMediaListItems, searchAll } from "~/models/media.server";

//components
import { SearchForm } from "~/components/searchForm";
import ListOfMediaDisplay from "~/components/listOfMedia";

type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
};
type SearchData = {
  searchReturn: Awaited<ReturnType<typeof searchAll>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");
  if (searchParams) {
    const searchReturn = await searchAll("all", searchParams);

    return json<SearchData>({ searchReturn });
  }

  const mediaListItems = await getMediaListItems();
  return json<LoaderData>({ mediaListItems });
};

export default function MediaPage() {
  const { mediaListItems } = useLoaderData() as LoaderData;
  const { searchReturn } = useLoaderData() as SearchData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search for movies or TV series"} />
      <div className="bg-blue-dark">
        <div>trending</div>
        <h1 className="pb-4 text-3xl text-white">Recommended for you</h1>
        {searchReturn ? (
          <ListOfMediaDisplay
            mediaListItems={searchReturn}
          ></ListOfMediaDisplay>
        ) : (
          <ListOfMediaDisplay
            mediaListItems={mediaListItems}
          ></ListOfMediaDisplay>
        )}
      </div>
    </div>
  );
}
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
