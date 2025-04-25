"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import dynamic from 'next/dynamic';
// Cast to any to bypass TS errors until type declarations are available
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false }) as any;

function AddPost() {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!isLoaded) return <div className="dark:text-gray-300">Loading..</div>; // or a loading spinner

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <div className="">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          alt=""
          className="w-12 h-12 object-cover rounded-full"
          width={48}
          height={48}
        />
      </div>

      {/* POST */}
      <div className="flex-1">
        {/* TXT INPUT */}
        <form action={(formData)=>addPost(formData,img?.secure_url||"")} className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg p-2"
            name="desc"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <div className="relative">
          <Image
            src="/emoji.png"
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
            width={20}
            height={20}
            onClick={() => setShowEmojiPicker(prev => !prev)}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-8 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData: any, event: any) => {
                  setDesc(prev => prev + emojiData.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
          <AddPostButton />
          </div>
        </form>

        {/* POST OPTIONS */}

        <div className="flex items-center gap-4 mt-4 text-gray-400 dark:text-gray-300 flex-wrap">
          <CldUploadWidget
            uploadPreset="socialsphere"
            onSuccess={(result, { widget }) => {
              setImg(result?.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
