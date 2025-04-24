"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";
import { set } from "zod";

function PostInfo({ postId }: { postId: number }) {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt=""
        width={16}
        height={16}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 w-32 right-0 bg-white dark:bg-gray-700 rounded-lg p-4 flex flex-col gap-2 text-xs shadow-lg z-30 dark:text-gray-200">
          <span className="cursor-pointer"> View</span>
          <span className="cursor-pointer"> Repost</span>
          <form action={deletePostWithId}>
            <button className="text-red-600 dark:text-red-400">delete</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostInfo;
