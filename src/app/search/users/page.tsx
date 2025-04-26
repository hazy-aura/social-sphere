// file: src/app/search/users/page.tsx
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/Client";
import dynamic from "next/dynamic";
const FollowButton = dynamic(() => import("@/components/FollowButton"), { ssr: false });
import { auth } from "@clerk/nextjs/server";

export default async function UsersSearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const q = searchParams.query?.trim() || "";
  const currentUser = auth();
  const currentUserId = currentUser.userId;
  const users = q
    ? await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: q, mode: "insensitive" } },
            { name:     { contains: q, mode: "insensitive" } },
            { surname:  { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          username: true,
          name: true,
          surname: true,
          avatar: true,
          description: true,
          city: true,
        },
      })
    : [];

  let followingIds: string[] = [];
  let pendingIds: string[] = [];
  if (currentUserId && q && users.length) {
    const followRecords = await prisma.follower.findMany({
      where: { followerId: currentUserId, followingId: { in: users.map((u) => u.id) } },
      select: { followingId: true },
    });
    followingIds = followRecords.map((f) => f.followingId);

    const pendingRecords = await prisma.followRequest.findMany({
      where: { senderId: currentUserId, receiverId: { in: users.map((u) => u.id) } },
      select: { receiverId: true },
    });
    pendingIds = pendingRecords.map((p) => p.receiverId);
  }

  return (
    <div className="min-h-[calc(100vh-64px-64px)] container mx-auto p-4 flex flex-col justify-start">
      <h1 className="text-2xl font-semibold mb-4">
        Search results for “{q}”
      </h1>

      {!q ? (
        <p className="text-gray-500 dark:text-gray-400">
          Please enter a search query.
        </p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No users found.
        </p>
      ) : (
        <ul className="flex flex-col sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <li
              key={u.username}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <Image
                src={u.avatar || "/noAvatar.png"}
                alt={`${u.name} ${u.surname}`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <Link
                href={`/profile/${u.username}`}
                className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                {u.name!=null && u.surname!=null ? u.name +" "+ u.surname : u.username}
              </Link>
              <p className="text-gray-500 dark:text-gray-400 ml-3">
                {u.description || "No description available"}
              </p>
              <p className="text-gray-500 dark:text-gray-400 ml-3">
                {u.city || "No city available"}
              </p>
              <div className="ml-auto">
                <FollowButton targetUserId={u.id} initialFollowed={followingIds.includes(u.id) || pendingIds.includes(u.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
