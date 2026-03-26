import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout