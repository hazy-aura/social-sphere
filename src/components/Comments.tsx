import Image from "next/image";

function Comment() {
  return (
    <div className="">
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/16171084/pexels-photo-16171084/free-photo-of-otter-lying-on-rocks.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          height={32}
          width={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt=""
            height={16}
            width={16}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* COMMENTS */}
      <div className="flex">
        {/* COMMENT */}
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <Image
            src="/emoji.png"
            alt=""
            height={40}
            width={40}
            className="w-10 h-10 rounded-full"
          />

          {/* DeSC */}
          <div className="flex flex-col gap-2 flex-1    ">
            <span className="font-medium"> Marshal Mathers</span>
            <p>
               
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
              voluptatum voluptatem tenetur modi? Quos autem dolor at fuga quasi
              et repellendus voluptatum assumenda reiciendis officia maiores
              cupiditate, adipisci eveniet rem?
            </p>
            <div className=" flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4 "> 
                <Image
                  src="/like.png"
                  alt=""
                  height={12}
                  width={12}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
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
      </div>
    </div>
  );
}

export default Comment;
