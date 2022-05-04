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
export async function getUserBookmarksIds(userId: User["id"]) {
  return prisma.userBookmarks.findMany({
    where: {
      userId: userId,
    },
    select: {
      mediaId: true,
    },
  });
}
export async function addBookmark(userId: User["id"], mediaId: Media["id"]) {
  return prisma.userBookmarks.create({
    data: {
      userId,
      mediaId,
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
export async function searchAll(
  category: "Movie" | "TV Series" | "all",
  params: Media["title"]
) {
  //remove spaces and add & for specific search
  const parsedParams = params.trimEnd().split(" ").join("|");
  switch (category) {
    case "all":
      return prisma.media.findMany({
        where: {
          title: {
            search: parsedParams,
          },
        },
      });

    default:
      return prisma.media.findMany({
        where: {
          category: category,
          title: {
            search: parsedParams,
          },
        },
      });
  }
}

  return prisma.media.findMany({
    where: {
      title: {
        search: parsedParams,
      },
    },
  });
}
