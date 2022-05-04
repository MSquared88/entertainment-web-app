import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//db
import { requireUserId } from "~/session.server";
import {
  getMediaListItems,
  searchAll,
  addBookmark,
  removeBookmark,
  getUserBookmarksIds,
} from "~/models/media.server";

//components
import { SearchForm } from "~/components/searchForm";
import ListOfMediaDisplay from "~/components/listOfMedia";
interface ActionData {
  errors: {
    mediaId?: string;
  };
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const mediaId = formData.get("mediaId");
  const action = formData.get("action");
  const userId = await requireUserId(request);
  if (typeof mediaId !== "string") {
    return json<ActionData>(
      { errors: { mediaId: "incorrect media id" } },
      { status: 400 }
    );
  }
  switch (action) {
    case "add-bookmark":
      addBookmark(userId, mediaId);
      return null;
    case "remove-bookmark":
      removeBookmark(userId, mediaId);
      return null;
  }
};

type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
  userBookmarksIds: string[];
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

  const userId = await requireUserId(request);
  const mediaListItems = await getMediaListItems();
  const userBookmarks = await getUserBookmarksIds(userId);
  const userBookmarksIds = userBookmarks.map((bookmark) => bookmark.mediaId);
  return json<LoaderData>({ mediaListItems, userBookmarksIds });
};

export default function MediaPage() {
  const { mediaListItems, userBookmarksIds } = useLoaderData() as LoaderData;

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
            userBookmarksIds={userBookmarksIds}
          ></ListOfMediaDisplay>
        ) : (
          <ListOfMediaDisplay
            mediaListItems={mediaListItems}
            userBookmarksIds={userBookmarksIds}
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
