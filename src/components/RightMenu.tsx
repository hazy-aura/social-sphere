import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendReq from "./FriendReq";

function RightMenu({userId}:{userId?:string}){
    return(
        <div className=" flex flex-col gap-6">
            <FriendReq />
            <Birthdays />
            <Ad size="md"/>
        </div>
    )
}

export default RightMenu;