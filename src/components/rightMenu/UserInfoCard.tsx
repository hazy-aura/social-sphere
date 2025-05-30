import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingRequestSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });
    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });
    followReqRes
      ? (isFollowingRequestSent = true)
      : (isFollowingRequestSent = false);
  }

  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4">
        {/* TOP */}
        <div className="flex justify-between items-center font-medium">
          <span className="text-gray-500 dark:text-gray-300"> User Information</span>
          {currentUserId === user.id ? (
            <UpdateUser user={user} />
          ) : (
            <Link href="/" className="text-blue-500 dark:text-blue-400 text-xs hover:underline">
              See all
            </Link>
          )}
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-xl text-black dark:text-white">
              {" "}
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </span>
            <span className="text-sm dark:text-gray-300"> @{user.username}</span>
          </div>
          {user.description && <p className="dark:text-gray-300">{user.description}</p>}
          {user.city && (
            <div className="flex items-center gap-2">
              <Image src="/map.png" alt="" width={16} height={16} />
              <span>
                Living in <b className="dark:text-gray-200">{user.city}</b>
              </span>
            </div>
          )}

          {user.school && (
            <div className="flex items-center gap-2">
              <Image src="/school.png" alt="" width={16} height={16} />
              <span>
                Went to <b className="dark:text-gray-200">{user.school}</b>{" "}
              </span>
            </div>
          )}

          {user.work && (
            <div className="flex items-center gap-2">
              <Image src="/work.png" alt="" width={16} height={16} />
              <span>
                Works at <b className="dark:text-gray-200">{user.work}</b>
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            {user.website && (
              <div className="flex gap-1 items-center">
                <Image src="/link.png" alt="" width={16} height={16} />
                <Link className="text-blue-500 dark:text-blue-400 font-medium hover:underline" href={user.website}>
                  {user.website}
                </Link>
              </div>
            )}

            <div className="flex gap-1 items-center">
              <Image src="/date.png" alt="" width={16} height={16} />
              <span>Joined {formattedDate} </span>
            </div>
          </div>
          {currentUserId && currentUserId != user.id && (
            <UserInfoCardInteraction
              userId={user.id}
              isUserBlocked={isUserBlocked}
              isFollowing={isFollowing}
              isFollowingRequestSent={isFollowingRequestSent}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfoCard;
