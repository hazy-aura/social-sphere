"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="">
        <span
          className=" text-blue-500 cursor-pointer text-xs"
          onClick={() => setOpen(true)}
        >
          Update
        </span>
        {open && (
          <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
            <form
              action={updateProfile}
              className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
            >
              {/* TITLE */}
              <h1>Update Profile</h1>
              <div className="mt-4 text-xs text-gray-500">
                Use the navbar profile to change the avatar or username.
              </div>
              {/* COVER PIC UPLOAD */}

              <div className="flex flex-col gap-4 my-4">
                <label htmlFor=""> Cover Picture</label>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={user.cover || "/noCover.png"}
                    width={48}
                    height={32}
                    alt=""
                    className="w-12 h-8 rounded-md object-cover"
                  />
                  <span className="text-xs underline text-gray-600">
                    {" "}
                    Change
                  </span>
                </div>
              </div>

              {/* WRAPPER */}
              <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder={user.name || "John"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="name"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder={user.surname || "Doe"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="surname"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder={user.description || "Life is Unfair.."}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="description"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    City
                  </label>
                  <input
                    type="text"
                    placeholder={user.city || "Dehradun"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="city"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    School
                  </label>
                  <input
                    type="text"
                    placeholder={user.school || "CST"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="school"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    Work
                  </label>
                  <input
                    type="text"
                    placeholder={user.work || "Wipro"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="work"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">
                    {" "}
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder={user.website || "www.goooogle.com"}
                    className="ring-1 ring-gray-300  p-[13px] rounded-md text-sm"
                    name="website"
                  />
                </div>
              </div>
              <button className="bg-blue-500 text-white p-2 mt-2 rounded-md">
                <span>Update</span>
              </button>

              <div
                className="absolute text-xl right-2 top-3 cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
