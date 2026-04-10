import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, ClipboardList } from 'lucide-react'
import React from 'react'

const TaskProgresstab = () => {
    return (
        <Card className={"rounded-md h-40  aspect-video bg-white/20 shadow-lg "}>
            <CardContent className={'flex justify-between items-center h-full px-10'}>
                <div className={'w-70 h-full  bg-white/70 backdrop-blur-lg border border-white/40  rounded-sm flex flex-col items-center justify-center  '}>
                    <h3 className='text-xl font-semibold'>12</h3>
                    <p>Total Task</p>
                </div>
                <div className={'w-70 h-full bg-white/70 backdrop-blur-lg border border-white/40 rounded-sm flex flex-col items-center justify-center'}>
                    <h3 className='text-xl font-semibold'>5</h3>
                    <p>Completed</p>
                </div>
                <div className={'w-70 h-full bg-white/70 backdrop-blur-lg border border-white/40 rounded-sm flex flex-col items-center justify-center'}>
                    <h3 className='text-xl font-semibold'>7</h3>
                    <p>Pending</p>
                </div>
                <div className={'w-50 rounded-sm flex items-center justify-center'}>
                    <Button className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-5 py-5 rounded-lg ">
                        Add Task
                    </Button>
                </div>

            </CardContent>
        </Card>
    )
}

export default TaskProgresstab