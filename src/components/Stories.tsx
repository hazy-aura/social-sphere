import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";

import StoryList from "./StoryList";

async function Stories() {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followingId: currentUserId,
              },
            },
          },
        },
        { userId: currentUserId },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide dark:text-gray-200">
      <div className="flex gap-8 w-max">
       <StoryList stories={stories} userId={currentUserId}/>
      </div>
    </div>
  );
}

export default Stories;
