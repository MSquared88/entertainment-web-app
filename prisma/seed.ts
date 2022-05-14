import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getMedia } from "./data";

const prisma = new PrismaClient();

async function seed() {
  const email = "demo@demo.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  await prisma.media.deleteMany({});
  await Promise.all(
    getMedia().map((media) => {
      const data = {
        title: media.title,
        year: media.year.toString(),
        category: media.category,
        rating: media.rating,
        isTrending: media.isTrending,
        smallThumbnail: media.thumbnail.regular.small,
        mediumThumbnail: media.thumbnail.regular.medium,
        largeThumbnail: media.thumbnail.regular.large,
        trendingThumbnail: media.thumbnail.trending?.large,
      };
      return prisma.media.create({ data });
    })
  );
  console.log(`Database has been seeded. 🌱`);
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
