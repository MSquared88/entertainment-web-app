import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//db
import { requireUserId } from "~/session.server";
import {
  getMediaListItems,
  searchMedia,
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
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
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
    const mediaListItems = await searchMedia("all", searchParams);
    return json<LoaderData>({ mediaListItems, userBookmarksIds, searchParams });
  }

  const mediaListItems = await getMediaListItems();
  return json<LoaderData>({ mediaListItems, userBookmarksIds, searchParams });
};

export default function MediaPage() {
  const { mediaListItems, userBookmarksIds, searchParams } =
    useLoaderData() as LoaderData;

  return (
    <div className=" flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search for movies or TV series"} />
      <div className="bg-blue-dark">
        <div>trending</div>
        <h1 className="pb-4 text-3xl text-white">
          {searchParams
            ? `Found ${mediaListItems.length} results for '${searchParams}'`
            : "Recommended for you"}
        </h1>
        <ListOfMediaDisplay
          mediaListItems={mediaListItems}
          userBookmarksIds={userBookmarksIds}
        ></ListOfMediaDisplay>
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
