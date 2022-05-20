import type { Media } from "@prisma/client";

import { TrendingListItem } from "~/components/trending/trendingListItem";

export default function TrendingMediaDisplay({
  mediaListItems,
  userBookmarksIds,
}: {
  mediaListItems: Media[];
  userBookmarksIds?: string[];
  children?: React.ReactChild | React.ReactChild[];
}) {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-white">Trending</h1>
      {
        <ul className="grid auto-cols-[500px] grid-flow-col overflow-x-auto py-4 scrollbar scrollbar-track-blue-semi scrollbar-thumb-blue-grayish ">
          {mediaListItems.map((media) => (
            <TrendingListItem
              userBookmarksIds={userBookmarksIds}
              key={media.id}
              media={media}
            />
          ))}
        </ul>
      }
    </div>
  );
}
