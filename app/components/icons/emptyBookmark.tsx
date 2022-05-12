import { Form } from "@remix-run/react";

import type { Media } from "@prisma/client";

import { motion } from "framer-motion";

export default function EmptyBookmark({ media }: { media: Media }) {
  return (
    <Form method="post">
      <input type="hidden" name="mediaId" defaultValue={media.id} hidden />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        name="action"
        value="add-bookmark"
        type="submit"
        className="group absolute top-8 right-8 rounded-full bg-blue-dark p-3 opacity-75 outline-none outline-hidden hover:opacity-100 hover:drop-shadow-xl focus:bg-white group-hover:bg-white"
      >
        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            strokeWidth="1.5"
            stroke="#FFF"
            fill="none"
            className="group-hover:fill-blue-dark group-hover:stroke-blue-dark group-focus:stroke-blue-dark"
          />
        </svg>
      </motion.button>
    </Form>
  );
}
