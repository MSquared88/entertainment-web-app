import type { Media } from "@prisma/client";

//components
import EmptyBookmark from "~/components/icons/emptyBookmark";
import FullBookmark from "~/components/icons/fullBookmark";
import MediaInfo from "~/components/mediaInfo";
import PlayIcon from "~/components/icons/playIcon";

import { motion } from "framer-motion";

export function TrendingListItem({
  userBookmarksIds,
  media,
}: {
  userBookmarksIds?: string[];
  media: Media;
}) {
  return (
    <motion.li
      whileHover={{
        scale: 1.03,
      }}
      className={`group relative mx-4 my-14 aspect-video max-h-[223px] w-[470px] text-white bg-[url('${media.largeThumbnail}')]`}
    >
      <PlayIcon />
      {userBookmarksIds?.includes(media.id) ? (
        <FullBookmark media={media} />
      ) : (
        <EmptyBookmark media={media} />
      )}

      <div className="flex">
        <MediaInfo media={media} />
      </div>
      <h1 className="text-2xl font-bold">{media.title}</h1>
    </motion.li>
  );
}
