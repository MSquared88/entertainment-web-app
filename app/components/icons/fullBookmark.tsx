import { Form } from "@remix-run/react";

import type { Media } from "@prisma/client";

import { motion } from "framer-motion";

export default function FullBookmark({ media }: { media: Media }) {
  return (
    <Form method="post">
      <input type="hidden" name="mediaId" defaultValue={media.id} hidden />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        name="action"
        value="remove-bookmark"
        type="submit"
        className="group absolute top-8 right-8 rounded-full bg-blue-dark p-3 opacity-75 outline-none outline-hidden hover:opacity-100 hover:drop-shadow-xl focus:bg-white group-hover:bg-white"
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            stroke="#FFF"
            strokeWidth="1.5"
            fill="#FFF"
            d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
            className=" group-hover:stroke-blue-dark group-focus:stroke-blue-dark"
          />
        </svg>
      </motion.button>
    </Form>
  );
}
