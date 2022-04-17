import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

//db
import { getTVListItems } from "~/models/media.server";

//components
import ListOfMediaDisplay from "~/components/listOfMedia";
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
    <div className="ml-48 flex h-full min-h-screen  flex-col bg-blue-dark">
      <div>
        <Form>
          <button className="c" type="submit">
            <img src="/assets/icon-search.svg" alt="" />
          </button>
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder={`search for something`}
            className="bg-blue-dark text-white placeholder:focus:text-blue-dark"
          />
        </Form>
      </div>
      <main className="flex h-full bg-blue-dark">
        <ListOfMediaDisplay mediaListItems={mediaListItems} />
      </main>
    </div>
  );
}
