import type { Media } from "@prisma/client";

import { MediaListItem } from "./mediaListItem";

export default function ListOfMediaDisplay({
  mediaListItems,
  userBookmarksIds,
  children,
}: {
  mediaListItems: Media[];
  userBookmarksIds?: string[];
  children?: React.ReactChild | React.ReactChild[];
}) {
  return (
    <div className="flex w-full flex-col">
      {children}
      {
        <div className="flex w-full justify-center">
          <ul className="flex w-full flex-wrap content-start items-center gap-4">
            {mediaListItems.map((media) => (
              <MediaListItem
                userBookmarksIds={userBookmarksIds}
                key={media.id}
                media={media}
              />
            ))}
          </ul>
        </div>
      }
    </div>
  );
}
