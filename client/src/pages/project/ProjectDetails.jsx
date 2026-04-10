import React from 'react'


const ProjectDetails = () => {
    return (
        <div className='w-full min-h-[calc(100vh-80px)] bg-[#F3F2FB] px-20 py-10 bg-[url(/bg.png)] bg-cover flex flex-col gap-10 '>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold text-2xl'>Project Title</h1>
                <p className='text-md text-gray-600'>project description</p>
            </div>
            <TaskProgresstab />
        </div>

    )
}

export default ProjectDetails