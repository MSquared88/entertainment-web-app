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
    <div className="flex h-[99%] w-full flex-col overflow-y-scroll lg:h-full">
      {children}
      {
        <ul className="scrollbar  bg-blue-dar flex h-[100%] flex-wrap items-center justify-center">
          {mediaListItems.map((media) => (
            <li key={media.id} className="text-white">
              <img alt={media.title} src={media.largeThumbnail} className="" />
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
