import Image from "next/image";
import React from "react";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-300 font-medium">
        <span> Sponsored Ads</span>
        <Image src="/more.png" alt="" height={16} width={16} />
      </div>

      {/* Bottom */}
      <div className={`flex flex-col mt-4 ${size==="sm"? "gap-2": "gap-4"}`}>
        <div className={`relative w-full ${size==="sm"? "h-24": size==="md"? "h-36": "h-48"}`}>
          <Image
            src="https://images.pexels.com/photos/30005400/pexels-photo-30005400/free-photo-of-elegant-heron-on-rocky-shore-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
         <Image
            src="https://images.pexels.com/photos/30005400/pexels-photo-30005400/free-photo-of-elegant-heron-on-rocky-shore-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-600 dark:text-blue-400 font-medium"> Atomic Lounge</span>
        </div>
        <p className={`${size==="sm"?"text-xs": "text-sm"} dark:text-gray-300`}>
            {size==="sm"? "Lorem ipsum dolor sit amet, consectetur adipiscing elit.": 
             size==="md"? "Lorem ipsum dolor sit amet, consectetur elit. Sed ut perspiciatis utem accusantium doloremque laudantium, totam rem aperiam.":
             "Lorem ipsum dolor sit amet, consectetur elit. Sed ut perspiciatis voluptatem accusantium doloremque laudantium, totam rem aperiam. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
            }
        </p>
        <button className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 p-2 text-xs rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"> Learn more</button>
      </div>
    </div>
  );
};

export default Ad;
