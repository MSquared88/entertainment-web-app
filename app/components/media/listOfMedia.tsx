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
    <>
      {children}
      {
        <ul className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaListItems.map((media) => (
            <MediaListItem
              userBookmarksIds={userBookmarksIds}
              key={media.id}
              media={media}
            />
          ))}
        </ul>
      }
    </>
  );
}
