import prisma from "@/lib/Client";
import Image from "next/image";
import CommentList from "./CommentList";

async function Comment({ postId }: { postId: number }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="dark:text-gray-200">
      {/* WRITE */}
      <CommentList comments={comments} postId={postId} />
    </div>
  );
}

export default Comment;
