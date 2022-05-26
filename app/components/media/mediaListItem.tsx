import type { Media } from "@prisma/client";

//components
import EmptyBookmark from "~/components/icons/emptyBookmark";
import FullBookmark from "~/components/icons/fullBookmark";
import MediaInfo from "./mediaInfo";
import PlayIcon from "../icons/playIcon";

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
      whileFocus={{
        scale: 1.03,
      }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group mx-4 my-14 max-h-[226px] min-h-[164px] min-w-[154px] max-w-[280px] text-white"
      aria-label={`${media.category} ${media.title} made in ${media.year} has a rating of ${media.rating}`}
      tabIndex={0}
    >
      <div
        className="relative"
        aria-label={`${media.category} ${media.title} made in ${media.year} has a rating of ${media.rating}`}
      >
        <img
          alt={media.title}
          src={media.mediumThumbnail}
          className="max-h-[223px] min-h-[164px] min-w-[154px] max-w-[280] rounded-xl border-blue-dark"
        />
        <PlayIcon />
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
