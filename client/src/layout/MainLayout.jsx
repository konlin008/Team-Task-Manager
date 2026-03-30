import Navbar from '@/components/shared/Navbar'
import SideBar from '@/components/shared/SideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='flex max-h-screen overflow-hidden'>
            <SideBar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout