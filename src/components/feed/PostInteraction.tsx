"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

function PostInteraction({postId, likes,commentNumber}:{ postId: number, likes: string[], commentNumber: number }) {

    const {isLoaded, userId} = useAuth();
    const [likeState,setLikeState] = useState({
        likeCount:likes.length,
        isLiked: userId? likes.includes(userId): false,
    });
    
    const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState,(state,value)=>{
        return{
            likeCount: state.isLiked? state.likeCount-1: state.likeCount+1,
            isLiked: !state.isLiked,
        }
    })
    const likeAction= async ()=>{
        switchOptimisticLike("")
        try{
            switchLike(postId);
            setLikeState((state)=>({
                likeCount: state.isLiked? state.likeCount-1: state.likeCount+1,
                isLiked: !state.isLiked,
            }))
        }
        catch(err){

        }
    }

    const shareAction = async () => {
      const shareUrl = `${window.location.origin}/posts/${postId}`;
      if (navigator.share) {
        try {
          await navigator.share({ title: "Check out this post", url: shareUrl });
        } catch (error) {
          console.error("Share failed:", error);
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert("Post link copied to clipboard");
        } catch (error) {
          console.error("Copy failed:", error);
        }
      }
    };

    return (
        <div className="dark:text-gray-200">
          <div className="flex items-center justify-between text-sm mt-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-gray-700 p-2 rounded-xl">
            <form action={likeAction}>
                <button>
            <Image
              src={optimisticLike.isLiked?"/liked.png":"/like.png"}
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            </button>
            </form>
            <span className="text-gray-300 dark:text-gray-500">|</span>
            <span className="text-gray-500 dark:text-gray-300">
              {optimisticLike.likeCount} <span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-gray-700 p-2 rounded-xl">
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300 dark:text-gray-500">|</span>
            <span className="text-gray-500 dark:text-gray-300">
              {commentNumber} <span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <button onClick={shareAction} className="flex items-center gap-4 bg-slate-100 dark:bg-gray-700 p-2 rounded-xl">
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300 dark:text-gray-500">|</span>
            <span className="text-gray-500 dark:text-gray-300">
              <span className="hidden md:inline">Share</span>
            </span>
          </button>
        </div>
      </div>
        </div>
    );
};

export default PostInteraction;