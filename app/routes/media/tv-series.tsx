import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

//db
import { getTVListItems } from "~/models/media.server";

//components
import ListOfMediaDisplay from "~/components/listOfMedia";
import { SearchForm } from "~/components/searchForm";

type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getTVListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const mediaListItems = await getTVListItems();
  return json<LoaderData>({ mediaListItems });
};

export default function MediaPage() {
  const { mediaListItems } = useLoaderData() as LoaderData;

  return (
    <div className="fixed flex flex-col bg-blue-dark lg:mt-12">
      <SearchForm placeHolder={"Search tv-series"} />
      <h1 className="pb-4 text-3xl text-white">TV Series</h1>
      <div className=" bg-blue-dark">
        <ListOfMediaDisplay mediaListItems={mediaListItems} />
      </div>
    </div>
  );
}
