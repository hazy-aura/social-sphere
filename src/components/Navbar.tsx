"use client"
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import ThemeToggle from './ThemeToggle';


function Navbar(){
    return(
        <div className=" h-24 flex items-center justify-between"> 
        {/* Left */}
        <div className=" md:hidden lg:block w-[20%]" > 
        <Link href="/" className='font-bold text-xl text-stone-900 dark:text-white'> SocialSphere</Link>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex w-[50%] text-sm items-center justify-between" >
                {/* LINKS */}
            <div className='flex gap-6 text-gray-600 dark:text-gray-300'>
            <Link href='/' className='flex items-center gap-2'> 
            <Image src="/home.png" alt="Homepage" width={16} height={16} />
            <span>
            Homepage
            </span>
            </Link>
            
            <Link href='/' className='flex items-center gap-2'> 
            <Image src="/friends.png" alt="Friends" width={16} height={16} />
            <span>
            Friends
            </span>
            </Link>

            <Link href='/' className='flex items-center gap-2'> 
            <Image src="/stories.png" alt="Stories" width={16} height={16} />
            <span>
            Stories
            </span>
            </Link>
            </div>  
            <form action="/search/users" method="get" className='hidden xl:flex p-1.5 bg-slate-100 dark:bg-slate-700 items-center rounded-xl'>
                <input
                    name="query"
                    type="text"
                    placeholder="Search users..."
                    className="bg-transparent outline-none dark:text-white dark:placeholder-gray-400"
                />
                <button type="submit">
                    <Image src="/search.png" alt="Search" width={14} height={14} />
                </button>
            </form>  
         </div>

        {/* RIGHT */}

        <div className=" w-[30%] flex items-center gap-4 xl:gap-8 justify-end"> 
        <ClerkLoading>
        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
        </ClerkLoading>
        <ClerkLoaded>
            <SignedIn>
                <div className='cursor-pointer'>
                    <Image src="/people.png" alt='' width={24} height={24} />
                </div>
                
                <div className='cursor-pointer'>
                <Image src="/messages.png" alt='' width={20} height={20} />
                </div>
                
                <div className='cursor-pointer'>
                <Image src="/notifications.png" alt='' width={20} height={20} />
                </div>
                <ThemeToggle />
                <UserButton />
            </SignedIn>
            
            <SignedOut>
                <div className='flex items-center gap-2 text-sm'>
                <Image src="/login.png" alt='' width={20} height={20} />
                <Link href="/sign-in" className="dark:text-white">Login/Register</Link>
                </div>
                <ThemeToggle />
            </SignedOut>

        </ClerkLoaded>

        <MobileMenu />

        </div>
        
        
        
        </div>
    )
}


export default Navbar;