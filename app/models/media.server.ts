import type { User, Media } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getUserBookmarks(userId: User["id"]) {
  return prisma.media.findMany({
    where: {
      userIds: {
        some: {
          userId: userId,
        },
      },
    },
  });
}
export async function getMediaListItems() {
  return prisma.media.findMany();
}
export async function getMovieListItems() {
  return prisma.media.findMany({
    where: {
      category: "Movie",
    },
  });
}
export async function getTVListItems() {
  return prisma.media.findMany({
    where: {
      category: "TV Series",
    },
  });
}
