import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SearchForm } from "~/components/searchForm";

//db
import {
  addBookmark,
  getMediaListItems,
  getUserBookmarksIds,
  removeBookmark,
  searchMedia,
} from "~/models/media.server";

//components
import ListOfMediaDisplay from "~/components/media/listOfMedia";
import { requireUserId } from "~/session.server";
import BackIcon from "~/components/icons/backIcon";

//action types
interface ActionData {
  errors: {
    mediaId?: string;
  };
}
//action
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const mediaId = formData.get("mediaId");
  const action = formData.get("action");
  const searchParams = formData.get("searchParams");

  const userId = await requireUserId(request);
  if (typeof mediaId !== "string") {
    return json<ActionData>(
      { errors: { mediaId: "incorrect media id" } },
      { status: 400 }
    );
  }
  switch (action) {
    case "add-bookmark":
      try {
        await addBookmark(userId, mediaId);
        return redirect(
          searchParams
            ? `/media/movies?search=${searchParams}`
            : "/media/movies"
        );
      } catch (error) {
        return json<ActionData>(
          {
            errors: {
              mediaId: `something went wrong adding a bookmark to ${mediaId}`,
            },
          },
          { status: 400 }
        );
      }
    case "remove-bookmark":
      try {
        await removeBookmark(userId, mediaId);
        return redirect(
          searchParams
            ? `/media/movies?search=${searchParams}`
            : "/media/movies"
        );
      } catch (error) {
        return json<ActionData>(
          {
            errors: {
              mediaId: `something went wrong removing bookmark for ${mediaId}`,
            },
          },
          { status: 400 }
        );
      }
  }
};

//loader types
type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
  userBookmarksIds: string[];
  searchParams: string | null;
};

//loader
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");
  const userId = await requireUserId(request);

  const userBookmarks = await getUserBookmarksIds(userId);
  const userBookmarksIds = userBookmarks.map((bookmark) => bookmark.mediaId);

  //search params
  if (searchParams) {
    const mediaListItems = await searchMedia("Movie", searchParams);
    return json<LoaderData>({ mediaListItems, userBookmarksIds, searchParams });
  }

  const mediaListItems = await getMediaListItems("Movie");
  return json<LoaderData>({ mediaListItems, userBookmarksIds, searchParams });
};

export default function MediaPage() {
  const { mediaListItems, userBookmarksIds, searchParams } =
    useLoaderData() as LoaderData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12 lg:ml-[5rem]">
      <SearchForm placeHolder={"Search movies"} />

      <div className=" bg-blue-dark">
        <h1 className="pb-4 text-3xl text-white">
          {searchParams
            ? `Found ${mediaListItems.length} results for '${searchParams}'`
            : "Movies"}
        </h1>
        <ListOfMediaDisplay
          mediaListItems={mediaListItems}
          userBookmarksIds={userBookmarksIds}
        >
          {searchParams ? <BackIcon /> : undefined}
        </ListOfMediaDisplay>
      </div>
    </div>
  );
}
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="bg-pink-200 text-red lg:ml-[5rem]">
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
