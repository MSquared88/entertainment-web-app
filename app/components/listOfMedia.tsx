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
        <ul className="scrollbar  flex h-[100%] flex-wrap items-center justify-center bg-blue-dark">
          {mediaListItems.map((media) => (
            <li key={media.id}>
              <img alt={media.title} src={media.largeThumbnail} className="" />
              <div>{media.title}</div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
