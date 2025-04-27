import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";

const FollowButton = dynamic(() => import("@/components/FollowButton"), { ssr: false });

export default async function FriendsPage() {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="min-h-[calc(100vh-64px-64px)] container mx-auto p-4 flex flex-col justify-start">
        <p className="text-gray-500 dark:text-gray-400">Please log in to see recommendations.</p>
      </div>
    );
  }

  const res = await fetch(`${process.env.BASE_URL}/recommendations/${userId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch friend recommendations");
  const users = await res.json();

  return (
    <div className="min-h-[calc(100vh-64px-64px)] container mx-auto p-4 flex flex-col justify-start">
      <h1 className="text-2xl font-semibold mb-4">Friend Recommendations</h1>
      {users.recommendations.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No recommendations available.</p>
      ) : (
        <ul className="flex flex-col">
          {users.recommendations.map((u: any) => (
            <li key={u.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <Image
                src={u.avatar || "/noAvatar.png"}
                alt={u.name || u.username}
                width={40}
                height={40}
                className="rounded-full"
              />
              <Link href={`/profile/${u.username}`} className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                {u.name && u.surname ? `${u.name} ${u.surname}` : u.username}
              </Link>
              <p className="text-gray-500 dark:text-gray-400 ml-3">{u.description || "No description available"}</p>
              <p className="text-gray-500 dark:text-gray-400 ml-3">{u.city || "No city available"}</p>
              <div className="ml-auto">
                <FollowButton targetUserId={u.id} initialFollowed={false} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
