"use client";

import { useState, useTransition } from "react";
import { switchFollow } from "@/lib/actions";

export default function FollowButton({ targetUserId, initialFollowed }: { targetUserId: string; initialFollowed: boolean }) {
  const [followed, setFollowed] = useState(initialFollowed);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const { status } = await switchFollow(targetUserId);
      // Treat both unfollow and cancel follow requests as not followed
      if (status === "Unfollowed" || status === "Follow Request Cancelled") {
        setFollowed(false);
      } else {
        setFollowed(true);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-3 py-1 rounded transition ${
        followed
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {isPending ? "…" : followed ? "Unfollow" : "Follow"}
    </button>
  );
}
