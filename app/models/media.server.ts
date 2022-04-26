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
export async function searchAll(params: Media["title"]) {
  //remove spaces and add & for specific search
  const parsedParams = params.trimEnd().split(" ").join("|");

  return prisma.media.findMany({
    where: {
      title: {
        search: parsedParams,
      },
    },
  });
}
export async function searchMovies() {
  return prisma.media.findMany({
    where: {
      category: "TV Series",
    },
  });
}
export async function searchTVSeries() {
  return prisma.media.findMany({
    where: {
      category: "TV Series",
    },
  });
}
