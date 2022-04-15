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
export async function getMediaListItems(userId: User["id"]) {
  return prisma.media.findMany();
}
