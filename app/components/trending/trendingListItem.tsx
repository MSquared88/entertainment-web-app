import type { Media } from "@prisma/client";

//components
import EmptyBookmark from "~/components/icons/emptyBookmark";
import FullBookmark from "~/components/icons/fullBookmark";
import MediaInfo from "~/components/mediaInfo";
import PlayIcon from "~/components/icons/playIcon";

export function TrendingListItem({
  userBookmarksIds,
  media,
}: {
  userBookmarksIds?: string[];
  media: Media;
}) {
  return (
    <li className="group relative flex aspect-video  w-full  min-w-[470px] text-white">
      <img
        alt={media.title}
        className="  w-full min-w-[470px]  rounded-xl border-blue-dark p-1"
        src={
          !media.trendingThumbnail
            ? media.largeThumbnail
            : media.trendingThumbnail
        }
        className="  rounded-xl border-blue-dark p-1"
      />
      <PlayIcon />
      {userBookmarksIds?.includes(media.id) ? (
        <FullBookmark media={media} />
      ) : (
        <EmptyBookmark media={media} />
      )}
      <div className="fle-col absolute bottom-5 left-4">
        <MediaInfo media={media} />
        <h1 className="text-2xl font-bold">{media.title}</h1>
      </div>
    </li>
  );
}
