import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SearchForm } from "~/components/searchForm";

//db
import { searchUserBookmarks, getUserBookmarks } from "~/models/media.server";
import { requireUserId } from "~/session.server";

//components
import ListOfMediaDisplay from "~/components/listOfMedia";

type LoaderData = {
  bookMarkedMedia: Awaited<ReturnType<typeof getUserBookmarks>>;
};
type SearchData = {
  searchReturn: Awaited<ReturnType<typeof searchUserBookmarks>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");
  const userId = await requireUserId(request);

  if (searchParams) {
    const searchReturn = await searchUserBookmarks(userId, searchParams);

    return json<SearchData>({ searchReturn });
  }

  const bookMarkedMedia = await getUserBookmarks(userId);
  return json<LoaderData>({ bookMarkedMedia });
};

export default function MediaPage() {
  const { bookMarkedMedia } = useLoaderData() as LoaderData;
  const { searchReturn } = useLoaderData() as SearchData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search for mookmarked shows"} />

      <div className=" bg-blue-dark">
        {searchReturn ? (
          <ListOfMediaDisplay
            mediaListItems={searchReturn}
          ></ListOfMediaDisplay>
        ) : (
          <div>
            <h1>Bookmarked Movies</h1>
            <ListOfMediaDisplay
              mediaListItems={bookMarkedMedia.filter((media) => {
                return media.category === "Movie";
              })}
            ></ListOfMediaDisplay>
            <h1>Bookmarked Series</h1>

            <ListOfMediaDisplay
              mediaListItems={bookMarkedMedia.filter((media) => {
                return media.category === "TV Series";
              })}
            ></ListOfMediaDisplay>
          </div>
        )}
      </div>
    </div>
  );
}
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="mt-36 bg-pink-200 p-10 text-red">
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
