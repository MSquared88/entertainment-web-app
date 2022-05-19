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
      className="group mx-4 my-14 max-h-[223px] min-h-[164px] min-w-[154px] max-w-[280px] text-white"
    >
      <div className="relative">
        <img
          alt={media.title}
          src={media.mediumThumbnail}
          className=" max-h-[223px] min-h-[164px] min-w-[154px] max-w-[280] rounded-xl border-blue-dark"
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