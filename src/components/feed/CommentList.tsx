"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState, useRef, useEffect } from "react";

type CommentWithUser = Comment & { user: User };

function CommentList({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  useEffect(() => {
    import('emoji-picker-element');
  }, []);

  const pickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!showEmojiPicker || !pickerRef.current) return;
    const handler = (event: any) => {
      setDesc(prev => prev + event.detail.unicode);
      setShowEmojiPicker(false);
    };
    pickerRef.current.addEventListener('emoji-click', handler);
    return () => {
      pickerRef.current?.removeEventListener('emoji-click', handler);
    };
  }, [showEmojiPicker]);

  const add = async()=>{
    if(!user|| !desc) return;
     
    addOptimisticComments({
        id: Math.random(),
        desc,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        userId:user.id,
        postId:postId,
        user:{
            id:user.id,
            username:"Sending....... Please Wait!",
            avatar:user.imageUrl|| "noAvatar.png",
            cover:"",
            description:"",
            name:"",
            surname:"",
            city:"",
            work:"",
            school:"",
            website:"",
            createdAt: new Date(Date.now())
        }
    });
    try{

        const createdComment = await addComment(postId, desc);
        setCommentState(prev=>[createdComment,...prev]);
    }
    catch(err){

    }
  }

  return (
    <div className="dark:text-gray-200">
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt=""
            height={32}
            width={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="relative flex flex-1 items-center justify-between bg-slate-100 dark:bg-gray-700 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent outline-none flex-1 dark:text-gray-200 dark:placeholder-gray-400"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="relative">
              <Image
                src="/emoji.png"
                alt=""
                height={16}
                width={16}
                className="cursor-pointer"
                onClick={() => setShowEmojiPicker(prev => !prev)}
              />
              {showEmojiPicker && (
                <div className="absolute bottom-8 right-0 z-50">
                  <emoji-picker ref={pickerRef} theme="auto"></emoji-picker>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {/* COMMENTS */}
      <div className="flex flex-col">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 mt-6" key={comment.id}>
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "noAvatar.png"}
              alt=""
              height={40}
              width={40}
              className="w-10 h-10 rounded-full"
            />

            {/* DeSC */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium dark:text-gray-200">
                {" "}
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p className="dark:text-gray-300">
                {comment.desc}
              </p>
              <div className="flex items-center gap-8 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    height={12}
                    width={12}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span className="text-gray-500 dark:text-gray-400">123 Likes</span>
                </div>
                <div>Reply</div>
              </div>
            </div>

            {/* ICOn */}
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
