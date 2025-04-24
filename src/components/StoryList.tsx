"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";
import { set } from "zod";

type StoryWithUser = Story & {
  user: User;
};

function StoryList({ stories, userId }: { stories: StoryWithUser[], userId: string }) {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const {user,isLoaded} = useUser();

  const [optimisticStories, addOptimisticStories] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const add = async()=>{
    if(!img?.secure_url) return;

    addOptimisticStories({
        id: Math.random(),
        img: img.secure_url,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now()+ 24*60*60*1000),
        userId: userId,
        user:{
            id:userId,
            username:"Sending....... Please Wait!",
            avatar:user?.imageUrl|| "noAvatar.png",
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
      const createdStory = await addStory(img?.secure_url);
      setStoryList(prev =>  
        [createdStory!, ...prev]
      );
      setImg(null);

    }
    catch(err){

    }
  }

  return (
    <>
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
               
          className="flex flex-col items-center gap-2 cursor-pointer relative"
        >
          <Image
            src={img?.secure_url|| user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2 ring-blue-300 dark:ring-blue-700 object-cover"
            onClick={()=>open()}
          />
          {img? <form action={add}>
            <button className="text-xs bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 p-1 rounded-md text-white transition-colors">send</button>
          </form>:(<span className="font-medium dark:text-gray-200">
            Add a Story
          </span>)}
          <div className="absolute text-6xl text-gray-200 dark:text-gray-700 top-1 opacity-50">+</div>
        </div>
              );
            }}
          </CldUploadWidget>
      {/* STORY */}
      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2 ring-blue-300 dark:ring-blue-700"
          />
          <span className="font-medium dark:text-gray-200">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
}

export default StoryList;
