import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Plus, Trash2, Users } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const AllAssignee = ({ assignees }) => {
    console.log(assignees);
    const tags = Array.from({ length: 50 }).map(
        (_, i, a) => `v1.2.0-beta.${a.length - i}`
    )
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer gap-1">
                    <Users size={20} />
                    <p className="text-sm">All Assignee</p>
                </div>
            </DialogTrigger>
            <DialogContent className={'w-100'}>
                <DialogHeader>
                    <DialogTitle>All Assigned Member</DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <ScrollArea className="h-20 w-full rounded-md border">
                    <div className="p-4">
                        {assignees.length === 0 ? <><p>No Assigned Member</p></> :
                            assignees?.map((assignee) => (
                                <React.Fragment key={assignee._id}>
                                    <div className='flex justify-between items-center '>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar >
                                                <AvatarImage src={assignee?.avatar} />
                                                <AvatarFallback>{assignee.name.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='text-md'>{assignee.name}</p>
                                                <p className='text-xs text-gray-400'>{assignee.email}</p>
                                            </div>
                                        </div>
                                        <Trash2 size={17} />
                                    </div>
                                    <Separator />
                                </React.Fragment>
                            ))}
                    </div>
                </ScrollArea>
                
            </DialogContent>
        </Dialog>
    )
}

export default AllAssignee