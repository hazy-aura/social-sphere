import { User } from "@prisma/client";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendReq from "./FriendReq";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

function RightMenu({user}:{user?:User}){
    return(
        <div className=" flex flex-col gap-6">
            
            {user?(<>
            <UserInfoCard user={user} />
            <UserMediaCard user={user} />
            </>):null}

            <FriendReq />
            <Birthdays />
            <Ad size="md"/>
        </div>
    )
}

export default RightMenu;