import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className='w-full h-20 bg-white rounded-md flex justify-end items-center px-20'>


            <div className='flex items-center gap-3'>
                <div className='bg-[#F3F2FB] p-1 rounded-full'>
                    <IoNotificationsOutline size={30} />
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Navbar