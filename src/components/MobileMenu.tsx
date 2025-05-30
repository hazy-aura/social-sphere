"use client"

import { useState } from "react";
import Link from "next/link";


function MobileMenu(){
    const [isOpen,setIsOpen] = useState(false);
    return(
        <div className="md:hidden"> 
        <div className="flex flex-col gap-[4.5px] cursor-pointer" 
        onClick={()=>setIsOpen((prev)=>!prev)}> 
        <div className={`w-6 h-1 bg-blue-600 dark:bg-blue-500 rounded-sm ${isOpen?"rotate-45":""} origin-left ease-in-out duration-500`} />
        <div className={`w-6 h-1 bg-blue-600 dark:bg-blue-500 rounded-sm ${isOpen?"opacity-0":""} ease-in-out duration-500`} />
        <div className={`w-6 h-1 bg-blue-600 dark:bg-blue-500 rounded-sm ${isOpen?"-rotate-45":""} origin-left ease-in-out duration-500`} />
        </div>
        {isOpen && (<div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 dark:text-white">
            <Link href='/' className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link href='/' className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Friends</Link>
            <Link href='/' className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Groups</Link>
            <Link href='/' className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stories</Link>
            <Link href='/' className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link>
        

        </div>)}


        </div>
    )
}


export default MobileMenu;