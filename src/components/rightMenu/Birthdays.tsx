import Image from "next/image";
import Link from "next/link";


const Birthdays = () => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm flex flex-col gap-4">
            {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 dark:text-gray-300"> Birthdays</span>
       
      </div>

      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/28643822/pexels-photo-28643822/free-photo-of-urban-architectural-scene-with-dramatic-shadows.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-xs dark:text-gray-200">Marshal Mathers</span>
        </div>

        <div className="flex gap-3 justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white text-xs px-2 py-1 rounded-md">Celebrate</button>
        </div>
      </div>
        {/* UPCOMING */}
      <div className="p-4 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center gap-4">
      <Image
            src="/gift.png"
            alt=""
            width={24}
            height={24}
          />
          <Link href="" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 dark:text-gray-200 font-semibold">Upcoming Birthdays</span>
          <span className="text-gray-500 dark:text-gray-400">See other 16 have Upcoming Birthdays</span>
           </Link>


      </div>
          
        </div>
    );
};

export default Birthdays;