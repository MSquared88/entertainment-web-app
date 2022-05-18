import { MediaListItem } from "./media/mediaListItem";
import type { Media } from "@prisma/client";

export default function ListOfBookmarksDisplay({
  movies,
  series,
  userBookmarksIds,
}: {
  movies: Media[];
  series: Media[];
  userBookmarksIds?: string[];
  children?: React.ReactChild | React.ReactChild[];
}) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="pb-4 text-3xl text-white">Bookmarked Movies</h1>
      <ul className="mb-24 flex flex-wrap content-start items-center gap-4">
        {movies.map((media) => (
          <MediaListItem
            userBookmarksIds={userBookmarksIds}
            key={media.id}
            media={media}
          />
        ))}
      </ul>
      <h1 className="pb-4 text-3xl text-white">Bookmarked Series</h1>
      <ul className="mb-24 flex flex-wrap content-start items-center gap-4 ">
        {series.map((media) => (
          <MediaListItem
            userBookmarksIds={userBookmarksIds}
            key={media.id}
            media={media}
          />
        ))}
      </ul>
    </div>
  );
}
