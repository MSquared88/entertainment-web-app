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
      <h1 className="pb-4 text-3xl text-white">Trending</h1>
      {
        <ul className="grid  h-[24rem] auto-cols-[36%] grid-flow-col gap-12 overflow-x-auto">
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
