import { Link, useMatches } from "@remix-run/react";
import { motion } from "framer-motion";

export default function BackIcon() {
  const matches = useMatches();
  const parentRoute = matches[matches.length - 1].pathname;
  return (
    <Link to={parentRoute}>
      <motion.svg
        whileHover={{ scale: 1.1 }}
        whileFocus={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        width="48px"
        height="48px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
      >
        <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
      </motion.svg>
    </Link>
  );
}
