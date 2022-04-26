import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { SearchForm } from "~/components/searchForm";

//db
import { getMovieListItems } from "~/models/media.server";

//components
import ListOfMediaDisplay from "~/components/listOfMedia";
type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMovieListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const mediaListItems = await getMovieListItems();
  return json<LoaderData>({ mediaListItems });
};

export default function MediaPage() {
  const { mediaListItems } = useLoaderData() as LoaderData;

  return (
    <div className="fixed flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search movies"} />
      <h1 className="pb-4 text-3xl text-white">Movies</h1>

      <div className=" bg-blue-dark">
        <ListOfMediaDisplay mediaListItems={mediaListItems} />
      </div>
    </div>
  );
}
