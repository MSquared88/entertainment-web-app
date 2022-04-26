import MediaInfo from "./mediaInfo";
import type { Media } from "@prisma/client";

export default function ListOfMediaDisplay({
  mediaListItems,
  children,
}: {
  mediaListItems: Media[];
  children?: React.ReactChild | React.ReactChild[];
}) {
  return (
    <div className="flex w-full flex-col">
      {children}
      {
        <ul className="scrollbar  flex h-[78vh] flex-wrap justify-start overflow-y-scroll">
          {mediaListItems.map((media) => (
            <li
              key={media.id}
              className="mx-4 my-14 max-h-[223px] max-w-[280] text-white"
            >
              <img
                alt={media.title}
                src={media.mediumThumbnail}
                className="max-w-sm rounded-xl border-blue-dark p-1"
              />
              <div className="flex">
                <MediaInfo media={media} />
              </div>
              <h1 className="text-2xl font-bold">{media.title}</h1>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
