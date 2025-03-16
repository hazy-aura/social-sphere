"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./Client";

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

    const {userId: currentUserId} = auth();

    if(!currentUserId){
        throw new Error("User not authenticated");
    }

    try{
        const existingBlock = await prisma.block.findFirst({
            where:{
                blockerId: currentUserId,
                blockedId: userId,
            }
        });
        if(existingBlock){
            await prisma.block.delete({
                where: {id: existingBlock.id},
            });
            return {status: "Unblocked"};
        }else{
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId,
                },
            });
            return {status: "Blocked"};
        }
    }
    catch(err){
        console.log(err);
        throw new Error("Something went wrong");
    }
};