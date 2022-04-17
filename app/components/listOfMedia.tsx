import type { Media } from "@prisma/client";

export default function ListOfMediaDisplay({
  mediaListItems,
}: {
  mediaListItems: Media[];
}) {
  return (
    <div className=" flex h-full w-full">
      {
        <ul className="flex flex-wrap bg-blue-dark">
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
