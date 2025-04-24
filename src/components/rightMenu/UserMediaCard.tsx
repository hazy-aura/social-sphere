import prisma from "@/lib/Client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500 dark:text-gray-300"> User Media</span>
          <Link href="/" className="text-blue-500 dark:text-blue-400 text-xs hover:underline">
            See all
          </Link>
        </div>
        {/* BOTTOM */}
        <div className="flex gap-4 justify-between flex-wrap">
          {postsWithMedia.length? postsWithMedia.map(post=> <div className="relative w-1/5 h-24" key={post.id}>
            <Image
              src={post.img!}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>): <p className="text-gray-500 dark:text-gray-400">No media found</p>}

        </div>
      </div>
    </>
  );
};

export default UserMediaCard;
