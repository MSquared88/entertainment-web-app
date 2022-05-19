import type { User, Media } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getMediaListItems(
  category?: "Movie" | "TV Series"
): Promise<Media[]> {
  if (!category) return prisma.media.findMany();

  return prisma.media.findMany({ where: { category } });
}

export async function searchMedia(
  category: "Movie" | "TV Series" | "all",
  params: Media["title"]
): Promise<Media[]> {
  //remove spaces and add & for specific search
  const parsedParams = params.trimEnd().split(" ").join("&");
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

//bookmarks
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

export async function removeBookmark(userId: User["id"], mediaId: Media["id"]) {
  return prisma.userBookmarks.delete({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });
}

export async function searchUserBookmarks(
  userId: User["id"],
  params: string
): Promise<Media[]> {
  return prisma.media.findMany({
    where: {
      userIds: {
        some: {
          userId: userId,
        },
      },
      title: {
        search: params,
      },
    },
  });
}
