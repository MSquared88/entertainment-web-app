import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

import { getUserId } from "~/session.server";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = await getUserId(request);
};

export default function EmptyBookmark() {
  return (
    <Form method="post">
      <button
        type="submit"
        name="action"
        className="group absolute top-8 right-8 rounded-full bg-blue-dark p-3 opacity-75 outline-none outline-hidden hover:bg-white hover:opacity-100 hover:drop-shadow-xl focus:bg-white"
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="#FFF"
            stroke-width="1.5"
            fill="none"
            className="group-hover:stroke-blue-dark group-focus:stroke-blue-dark"
          />
        </svg>
      </button>
    </Form>
  );
}
