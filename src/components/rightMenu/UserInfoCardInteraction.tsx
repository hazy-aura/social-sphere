"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingRequestSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingRequestSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followRequestSent: isFollowingRequestSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followRequestSent:
          !prev.following && !prev.followRequestSent ? true : false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followRequestSent:
              !state.following && !state.followRequestSent ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm rounded-md p-2 transition-colors">
          {optimisticState.following
            ? "Unfollow"
            : optimisticState.followRequestSent
            ? "Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button>
          <span className="text-red-500 dark:text-red-400 text-xs cursor-pointer hover:underline">
            {optimisticState.blocked ? "Unblock" : "Block"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
