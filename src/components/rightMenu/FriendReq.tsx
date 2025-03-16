import prisma from "@/lib/Client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendReqList from "./FriendReqList";


const FriendReq = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const reqs = await prisma.followRequest.findMany({
    where:{
      receiverId: userId,
    },
    include:{
      sender:true
    },
  });

  if(reqs.length===0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500"> Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* USER */}
      {<FriendReqList requests={reqs}  />  }
    </div>
  );
};

export default FriendReq;
