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
    <div className="flex w-full flex-col overflow-auto ">
      <h1 className="pb-4 text-3xl text-white">Trending</h1>
      {
        <ul className="flex content-center items-center gap-4">
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
