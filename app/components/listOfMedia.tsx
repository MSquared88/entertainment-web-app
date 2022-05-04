import MediaInfo from "./mediaInfo";
import type { Media } from "@prisma/client";

import { motion } from "framer-motion";

import EmptyBookmark from "~/components/icons/emptyBookmark";
import FullBookmark from "~/components/icons/fullBookmark";

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
        <ul className="flex h-[78vh] flex-wrap items-center gap-4">
          {mediaListItems.map((media) => (
            <motion.li
              whileHover={{ scale: 1.03 }}
              key={media.id}
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
          ))}
        </ul>
      }
    </div>
  );
}
