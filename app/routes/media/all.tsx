import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

//db
import { getMediaListItems } from "~/models/media.server";

//components
import ListOfMediaDisplay from "~/components/listOfMedia";
type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const mediaListItems = await getMediaListItems();
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
            className="text- mb-4 h-8 w-96 border-b bg-blue-dark text-white placeholder:focus:text-blue-dark"
          />
        </Form>
      </div>
      <main className="flex h-full bg-blue-dark">
        <ListOfMediaDisplay mediaListItems={mediaListItems} />
      </main>
    </div>
  );
}
