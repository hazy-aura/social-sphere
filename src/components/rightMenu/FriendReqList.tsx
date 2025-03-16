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
    <div>
      {optimisticRequest.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-sm">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>

          <div className="flex gap-3 justify-end">
            <form action={()=>accept(request.id, request.senderId)}> 
                <button>
            <Image
              src="/accept.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            </button>
            </form>

            <form action={()=>decline(request.id, request.senderId)}> 
            <button>
            <Image
              src="/reject.png"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
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
