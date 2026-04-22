import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Plus, Trash2, Users } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAssignMember, useUnassignedMembers } from '@/hooks/task.hooks'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

const AllAssignee = ({ assignees, taskId }) => {
    const { data: unassignedMembersData, isSuccess: unassignedMembersIsSuccess, isError: unassignedMembersIsError, error: unassignedMembersError } = useUnassignedMembers(taskId)
    const { mutate: assignMember } = useAssignMember()
    useEffect(() => {

        if (unassignedMembersIsError) toast.error(unassignedMembersError?.response?.data?.message);
    }, [unassignedMembersIsError, unassignedMembersError])
    console.log(unassignedMembersData);
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
                <ScrollArea className="h-50 w-full rounded-md border">
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
                <DialogTitle>Assign New Member</DialogTitle>
                <ScrollArea className="h-50 w-full rounded-md border">
                    <div className="p-4 flex flex-col gap-2">
                        {
                            unassignedMembersData?.unassignedMembers?.map((member) => (
                                <React.Fragment >
                                    <div className='flex justify-between items-center ' key={member?.user?._id}>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar >
                                                <AvatarImage src={member?.user?.avatar} />
                                                <AvatarFallback>{member?.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='text-md'>{member?.user?.name}</p>
                                                <p className='text-xs text-gray-400'>{member?.user?.email}</p>
                                            </div>
                                        </div>
                                        <Button variant='outline' onClick={() => assignMember({ taskId, memberId: member?.user?._id })}><Plus size={17} /></Button>
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