import { motion } from "framer-motion";

export default function PlayIcon() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
      className="absolute inset-x-[36%] inset-y-1/2 hidden h-12 w-32 content-between items-center rounded-full bg-white bg-opacity-30 px-2 group-hover:flex"
    >
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
          fill="#FFF"
        />
      </svg>
      <h1 className="ml-4 text-xl font-medium text-white">Play</h1>
    </motion.button>
  );
}
