"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState, useEffect } from "react";
import { set } from "zod";

type StoryWithUser = Story & {
  user: User;
};

function StoryList({ stories, userId }: { stories: StoryWithUser[], userId: string }) {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();
  const [selectedStory, setSelectedStory] = useState<StoryWithUser | null>(null);

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

  const goToNext = () => {
    if (!selectedStory) return;
    const index = optimisticStories.findIndex((s) => s.id === selectedStory.id);
    if (index !== -1 && index < optimisticStories.length - 1) {
      setSelectedStory(optimisticStories[index + 1]);
    } else {
      setSelectedStory(null);
    }
  };

  useEffect(() => {
    if (!selectedStory) return;
    // only auto-advance images after 15s
    const isVideo = /\.(mp4|webm|ogg)$/i.test(selectedStory.img);
    if (isVideo) return;
    const timer = setTimeout(goToNext, 15000);
    return () => clearTimeout(timer);
  }, [selectedStory, optimisticStories]);

  return (
    <>
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedStory(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {selectedStory.img.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                controls
                autoPlay
                onEnded={goToNext}
                src={selectedStory.img}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <Image
                src={selectedStory.img}
                alt="Story"
                width={600}
                height={600}
                className="max-w-full max-h-full object-contain"
              />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedStory(null); }}
              className="absolute top-2 right-2 text-white text-3xl"
            >&times;</button>
          </div>
        </div>
      )}
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
          onClick={() => setSelectedStory(story)}
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
