import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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
import ListOfBookmarksDisplay from "~/components/listOfBookmarks";
import ListOfMediaDisplay from "~/components/media/listOfMedia";
import BackIcon from "~/components/icons/backIcon";

interface ActionData {
  errors: {
    mediaId?: string;
  };
}
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
        addBookmark(userId, mediaId);
        return redirect(
          searchParams
            ? `/media/bookmarks?search=${searchParams}`
            : "/media/bookmarks"
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
            ? `/media/bookmarks?search=${searchParams}`
            : "/media/bookmarks"
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

type LoaderData = {
  bookMarkedMedia: Awaited<ReturnType<typeof getUserBookmarks>>;
  userBookmarksIds: string[];
  searchParams: string | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("search");
  const userId = await requireUserId(request);

  const userBookmarks = await getUserBookmarksIds(userId);
  const userBookmarksIds = userBookmarks.map((bookmark) => bookmark.mediaId);

  //search params
  if (searchParams) {
    const bookMarkedMedia = await searchUserBookmarks(userId, searchParams);
    return json<LoaderData>({
      bookMarkedMedia,
      userBookmarksIds,
      searchParams,
    });
  }

  const bookMarkedMedia = await getUserBookmarks(userId);
  return json<LoaderData>({ bookMarkedMedia, userBookmarksIds, searchParams });
};

export default function MediaPage() {
  const { bookMarkedMedia, userBookmarksIds, searchParams } =
    useLoaderData() as LoaderData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12 lg:ml-[5rem]">
      <SearchForm placeHolder={"Search for bookmarked shows"} />

      <div className=" bg-blue-dark">
        {searchParams ? (
          <>
            <h1 className="pb-4 text-3xl text-white">{`Found ${bookMarkedMedia.length} results for '${searchParams}'`}</h1>
            <ListOfMediaDisplay
              mediaListItems={bookMarkedMedia}
              userBookmarksIds={userBookmarksIds}
            >
              {" "}
              <BackIcon />
            </ListOfMediaDisplay>
          </>
        ) : (
          <>
            <ListOfBookmarksDisplay
              movies={bookMarkedMedia.filter((media) => {
                return media.category === "Movie";
              })}
              series={bookMarkedMedia.filter((media) => {
                return media.category === "TV Series";
              })}
              userBookmarksIds={userBookmarksIds}
            ></ListOfBookmarksDisplay>
          </>
        )}
      </div>
    </div>
  );
}
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="mt-36 bg-pink-200 p-10 text-red lg:ml-[5rem]">
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
