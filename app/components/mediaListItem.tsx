import type { Media } from "@prisma/client";

//components
import EmptyBookmark from "~/components/icons/emptyBookmark";
import FullBookmark from "~/components/icons/fullBookmark";
import MediaInfo from "./mediaInfo";

import { motion } from "framer-motion";

export function MediaListItem({
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
      className="mx-4 my-14 max-h-[223px] max-w-[280] text-white"
    >
      <div className="relative">
        <img
          alt={media.title}
          src={media.mediumThumbnail}
          className="max-w-sm rounded-xl border-blue-dark p-1"
        />
        {userBookmarksIds?.includes(media.id) ? (
          <FullBookmark media={media} />
        ) : (
          <EmptyBookmark media={media} />
        )}
      </div>
      <div className="flex">
        <MediaInfo media={media} />
      </div>
      <h1 className="text-2xl font-bold">{media.title}</h1>
    </motion.li>
  );
}
