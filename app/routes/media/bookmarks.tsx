import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SearchForm } from "~/components/searchForm";

//db
import {
  searchUserBookmarks,
  getUserBookmarks,
  getUserBookmarksIds,
  addBookmark,
  removeBookmark,
} from "~/models/media.server";
import { requireUserId } from "~/session.server";

//components
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
      try {
        const bookmark = await addBookmark(userId, mediaId);
        return bookmark;
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
        const bookmark = await removeBookmark(userId, mediaId);
        return bookmark;
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

type LoaderData = {
  bookMarkedMedia: Awaited<ReturnType<typeof getUserBookmarks>>;
  userBookmarksIds: string[];
  isSearch: Boolean;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");
  const userId = await requireUserId(request);

  const userBookmarks = await getUserBookmarksIds(userId);
  const userBookmarksIds = userBookmarks.map((bookmark) => bookmark.mediaId);

  //search params
  let isSearch = false;
  if (searchParams) {
    isSearch = true;
    const bookMarkedMedia = await searchUserBookmarks(userId, searchParams);
    return json<LoaderData>({ bookMarkedMedia, userBookmarksIds, isSearch });
  }

  const bookMarkedMedia = await getUserBookmarks(userId);
  return json<LoaderData>({ bookMarkedMedia, userBookmarksIds, isSearch });
};

export default function MediaPage() {
  const { bookMarkedMedia, userBookmarksIds, isSearch } =
    useLoaderData() as LoaderData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search for mookmarked shows"} />

      <div className=" bg-blue-dark">
        {isSearch ? (
          <ListOfMediaDisplay
            mediaListItems={bookMarkedMedia}
            userBookmarksIds={userBookmarksIds}
          ></ListOfMediaDisplay>
        ) : (
          <div>
            <h1>Bookmarked Movies</h1>
            <ListOfMediaDisplay
              mediaListItems={bookMarkedMedia.filter((media) => {
                return media.category === "Movie";
              })}
              userBookmarksIds={userBookmarksIds}
            ></ListOfMediaDisplay>
            <h1>Bookmarked Series</h1>

            <ListOfMediaDisplay
              mediaListItems={bookMarkedMedia.filter((media) => {
                return media.category === "TV Series";
              })}
              userBookmarksIds={userBookmarksIds}
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
