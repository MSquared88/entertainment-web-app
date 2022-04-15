import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getMediaListItems } from "~/models/media.server";

type LoaderData = {
  mediaListItems: Awaited<ReturnType<typeof getMediaListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const mediaListItems = await getMediaListItems(userId);
  return json<LoaderData>({ mediaListItems });
};

export default function MediaPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col bg-blue-semi">
      <header className="flex items-center justify-between p-4 text-white">
        <ul className="flex w-full justify-between">
          <li>
            {" "}
            <h1 className="text-3xl font-bold">
              <NavLink to="." prefetch="intent">
                medias
              </NavLink>
            </h1>
          </li>
          <li>
            {" "}
            <h1 className="text-3xl font-bold">
              <NavLink to="movies" prefetch="intent">
                movies
              </NavLink>
            </h1>
          </li>
          <li>
            {" "}
            <h1 className="text-3xl font-bold">
              <NavLink to="tv-series" prefetch="intent">
                tv series
              </NavLink>
            </h1>
          </li>
          <li>
            {" "}
            <h1 className="text-3xl font-bold">
              <NavLink to="bookmarks">bookmarks</NavLink>
            </h1>
          </li>
        </ul>

        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>
      <Outlet />
    </div>
  );
}
