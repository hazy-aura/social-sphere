import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Ad from "../Ad";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/Client";

async function LeftMenu({ type }: { type: "home" | "profile" }) {
  const { userId } = auth();
  let username = "";
  if (userId) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { username: true } });
    username = u?.username ?? "";
  }

  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-2 text-gray-500 dark:text-gray-300">
        <Link
          href={`/profile/${username}`}
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/posts.png" alt="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/activity.png" alt="" width={20} height={20} />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="https://www.amazon.in/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/market.png" alt="" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="https://calendar.google.com/calendar"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/events.png" alt="" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="/albums"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/albums.png" alt="" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="https://www.youtube.com/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/videos.png" alt="" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="https://news.google.com/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/news.png" alt="" width={20} height={20} />
          <span>News</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/lists.png" alt="" width={20} height={20} />
          <span>Lists</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="https://www.udemy.com/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/courses.png" alt="" width={20} height={20} />
          <span>Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-100 dark:border-gray-600 w-36 self-center" />

        <Link
          href="/settings"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
        >
          <Image src="/settings.png" alt="" width={20} height={20} />
          <span>Settings</span>
        </Link>
      </div>
      <Ad size="sm" />
    </div>
  );
}

export default LeftMenu;
