import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function AlbumsPage() {
  const { userId } = auth();
  if (!userId) {
    return (
      <div className="text-center p-4 dark:text-gray-200">
        Please sign in to view your albums.
      </div>
    );
  }

  const photos = await prisma.post.findMany({
    where: {
      userId,
      img: { not: null },
    },
    select: { id: true, img: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="p-4">
          <h1 className="text-2xl font-medium dark:text-white mb-4">
            Albums
          </h1>
          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative w-full aspect-square">
                  <Image
                    src={photo.img as string}
                    alt=""
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              No photos available.
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
