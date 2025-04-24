"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { set } from "zod";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(user.cover);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <>
      <div className="">
        <span
          className="text-blue-500 dark:text-blue-400 cursor-pointer text-xs hover:underline"
          onClick={() => setOpen(true)}
        >
          Update
        </span>
        {open && (
          <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex justify-center items-center z-50">
            <form
              action={(formData) =>
                formAction({ formData, cover: cover?.secure_url || "" })
              }
              className="p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative dark:text-gray-200"
            >
              {/* TITLE */}
              <h1>Update Profile</h1>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Use the navbar profile to change the avatar or username.
              </div>
              {/* COVER PIC UPLOAD */}

              <CldUploadWidget
                uploadPreset="socialsphere"
                onSuccess={(result) => setCover(result?.info)}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4"
                      onClick={() => open()}
                    >
                      <label htmlFor=""> Cover Picture</label>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                          src={user.cover || "/noCover.png"}
                          width={48}
                          height={32}
                          alt=""
                          className="w-12 h-8 rounded-md object-cover"
                        />
                        <span className="text-xs underline text-gray-600 dark:text-gray-400">
                          {" "}
                          Change
                        </span>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>

              {/* WRAPPER */}
              <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder={user.name || "John"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="name"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder={user.surname || "Doe"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="surname"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder={user.description || "Life is Unfair.."}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="description"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    City
                  </label>
                  <input
                    type="text"
                    placeholder={user.city || "Dehradun"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="city"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    School
                  </label>
                  <input
                    type="text"
                    placeholder={user.school || "CST"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="school"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    Work
                  </label>
                  <input
                    type="text"
                    placeholder={user.work || "Wipro"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="work"
                  />
                </div>
                {/* INPUT */}
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    Website
                  </label>
                  <input
                    type="text"
                    placeholder={user.website || "www.goooogle.com"}
                    className="ring-1 ring-gray-300 dark:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 p-[13px] rounded-md text-sm"
                    name="website"
                  />
                </div>
              </div>
             <UpdateButton />
              {state.success && (
                <span className="text-green-500 text-sm mt-2">
                  Profile Updated
                </span>
              )}
              {state.error && (
                <span className="text-red-500 text-sm mt-2">
                  Something Went wrong
                </span>
              )}

              <div
                className="absolute text-xl right-2 top-3 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
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
