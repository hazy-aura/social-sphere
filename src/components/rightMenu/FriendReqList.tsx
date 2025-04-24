"use client";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useState, useOptimistic } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendReqList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);
  
  const accept = async(requestId:number, userId: string)=>{
    removeOptimisticRequest(requestId);

    try{
        await acceptFollowRequest(userId)
        setRequestState((state)=>state.filter((req)=>req.id!==requestId));
    }catch(err){}
  }


  const decline = async(requestId:number, userId: string)=>{
    removeOptimisticRequest(requestId);

    try{
        await declineFollowRequest(userId)
        setRequestState((state)=>state.filter((req)=>req.id!==requestId));
    }catch(err){}
  }

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  return (
    <div className="dark:text-gray-200">
      {optimisticRequest.map((request) => (
        <div className="flex items-center justify-between mb-4" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-sm dark:text-gray-200">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>

          <div className="flex gap-3 justify-end">
            <form action={()=>accept(request.id, request.senderId)}> 
                <button className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
            <Image
              src="/accept.png"
              alt="Accept"
              width={20}
              height={20}
              className="cursor-pointer"
              title="Accept friend request"
            />
            </button>
            </form>

            <form action={()=>decline(request.id, request.senderId)}> 
            <button className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
            <Image
              src="/reject.png"
              alt="Reject"
              width={20}
              height={20}
              className="cursor-pointer"
              title="Reject friend request"
            />
             </button>
             </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendReqList;
