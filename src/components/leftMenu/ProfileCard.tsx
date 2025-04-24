import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const ProfileCard = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  console.log(user);
  if (!user) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-6 pb-8">
      <div className="h-20 relative">
        <Image
          src={user.cover || "/noCover.png"}
          alt=""
          fill
          className="object-cover rounded-md"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="object-cover rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white dark:ring-gray-800 z-10"
        />
      </div>
      <div className="flex flex-col gap-2 items-center h-20">
        <span className="font-semibold dark:text-gray-200">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <div className="flex-items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/8521518/pexels-photo-8521518.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-cover rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/8521518/pexels-photo-8521518.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-cover rounded-full w-3 h-3"
            />

            <Image
              src="https://images.pexels.com/photos/8521518/pexels-photo-8521518.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-cover rounded-full w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {user._count.followers} followers
          </span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs p-2 rounded-md">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
