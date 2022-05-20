import type { Media } from "@prisma/client";
import MoviesIcons from "~/components/icons/moviesIcon";
import TvSeriesIcons from "~/components/icons/tvSeriesIcon";

export default function MediaInfo({ media }: { media: Media }) {
  return (
    <ul className="my-2 flex text-xs">
      <li className="flex  items-center justify-center">
        <p className="w-[2rem] text-center">{media.year}</p>
        <p className="w-[2rem] text-center text-[7px]">{"\u2B24"}</p>
      </li>
      {media.category === "Movie" ? (
        <li className="flex w-[4rem] items-center justify-center gap-1">
          <MoviesIcons isActive={true} />
          <p className="whitespace-nowrap text-center">{media.category}</p>
        </li>
      ) : (
        <li className="flex w-[6rem] items-center justify-center gap-1">
          <TvSeriesIcons isActive={true} />
          <p className="whitespace-nowrap text-center">{media.category}</p>
        </li>
      )}{" "}
      <li className="flex items-center justify-center">
        <p className="w-[2rem] text-center text-[7px]">{"\u2B24"}</p>
        <p className="w-[2rem] text-center">{media.rating}</p>
      </li>
    </ul>
  );
}
