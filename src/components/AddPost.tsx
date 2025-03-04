import Image from "next/image";

function AddPost() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4  justify-between text-sm">
      {/* AVATAR */}
      <div className="">
        <Image
          src="https://images.pexels.com/photos/29782661/pexels-photo-29782661/free-photo-of-beautiful-kyoto-yasaka-pagoda-in-historic-district.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          className="w-12 h-12 object-cover rounded-full"
          width={48}
          height={48}
        />
      </div>

      {/* POST */}
      <div className="flex-1">
        {/* TXT INPUT */}
        <div className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
          ></textarea>
          <Image
            src="/emoji.png"
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
            width={20}
            height={20}
          />
        </div>

        {/* POST OPTIONS */}
        
        
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" alt="" width={20} height={20} />
            Photo
          </div>
        
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
