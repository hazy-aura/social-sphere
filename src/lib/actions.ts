"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./Client";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
  const authData = auth();
  const currentUserId = authData?.userId;

  if (!currentUserId) {
    throw new Error("User not authenticated");
  }

  try {
    // Check if the user is already following
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: { id: existingFollow.id },
      });
      return { status: "Unfollowed" };
    }

    // Check if a follow request exists
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: userId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: { id: existingFollowReq.id },
      });
      return { status: "Follow Request Cancelled" };
    }

    // Create a new follow request
    await prisma.followRequest.create({
      data: {
        senderId: currentUserId,
        receiverId: userId,
      },
    });

    return { status: "Follow Request Sent" };
  } catch (err) {
    console.error("Error in switchFollow:", err);
    throw new Error("Something went wrong");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User not authenticated");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (existingBlock) {
      await prisma.block.delete({
        where: { id: existingBlock.id },
      });
      return { status: "Unblocked" };
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
      return { status: "Blocked" };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User not authenticated");
  }

  try {
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: { id: existingFollowReq.id },
      });

      await prisma.follower.create({
        data: {
          followerId: currentUserId,
          followingId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User not authenticated");
  }

  try {
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowReq) {
      await prisma.followRequest.delete({
        where: { id: existingFollowReq.id },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async (prevState:{success:boolean, error:boolean,}, payload: {formData: FormData,cover:string}) => {
  
  const {formData,cover} = payload;
  
  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_,value])=>value !== "")
  );


  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(300).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedProfile = Profile.safeParse({cover, ...filteredFields});

  if (!validatedProfile.success) {
    console.log(validatedProfile.error.flatten().fieldErrors);
    return {success:false, error:true};
  }
  const { userId } = auth();
  if (!userId) return {success:false, error:true};


  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedProfile.data,
    });
      return {success:true, error:false};

  } catch (err) {
    console.log(err);
     return {success:false, error:true};

  }
};
