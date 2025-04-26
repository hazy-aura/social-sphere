import Post from '@/components/feed/Post';
import prisma from '@/lib/Client';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const id = parseInt(params.postId, 10);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      likes: { select: { userId: true } },
      _count: { select: { comments: true } },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-64px-64px)] flex flex-col justify-start">
      <div className="flex justify-center pt-6 flex-1">
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <Post post={post} />
        </div>
      </div>
    </div>
  );
}
