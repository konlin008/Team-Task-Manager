import React from 'react'

const SideBar = () => {
    return (
        <div className=' w-70 px-10 bg-linear-to-b from-neutral-50 to-violet-300'>
            <div className='flex items-center  gap-2 h-20 '>
                <img src="/icon.png" alt="" className='w-10 h-10' />
                <h1 className='font-heading font-semibold text-3xl'>Task<span className='text-blue-600'>Zen</span></h1>
            </div>
        </div>
    )
}

export default SideBar