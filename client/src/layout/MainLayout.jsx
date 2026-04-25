import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
    return (
        <div className="flex h-screen flex-col">
            <div className="sticky top-0 z-50 h-[8%] px-40">
                <Navbar />
            </div>
            <div className='flex-1 overflow-auto py-10 px-40 bg-[url(/bg.png)] bg-cover'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout