import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ChevronRight, Plus, Trash2, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAllMembers, useAllRequests, useReviewRequest } from '@/hooks/workspace.hook'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

const WorkspaceMembersCard = ({ workspaceId }) => {
    const { data, error } = useAllMembers(workspaceId)
    useEffect(() => {
        if (error) toast.error(error.response.data.message);
    }, [error])
    console.log(data);
    return (
        <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
            <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>Manage projects, track progress, and keep your team aligned.</CardDescription>
                <CardAction >
                    <Button
                        variant="outline"
                        className=" rounded-full px-4 py-2 text-sm font-medium text-violet-600 border-violet-200  bg-white/60 backdrop-blur-md hover:bg-violet-50 flex items-center gap-1">
                        View All
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className={'flex flex-col gap-5'}>
                <div className='flex flex-col gap-2'>
                    {
                        data?.members?.map((member) => {
                            return (
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border" key={member?._id}>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={member?.Avatar} />
                                            <AvatarFallback>{member?.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800">
                                                {member?.name}
                                            </h4>
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>
                <AddMemberCard workspaceId={workspaceId} />
            </CardContent>
        </Card>
    )
}

export default WorkspaceMembersCard

const AddMemberCard = ({ workspaceId }) => {
    const { mutate: reviewRequest, data: requestData, isSuccess, isError, error } = useReviewRequest()
    const { data, isLoading } = useAllRequests(workspaceId)
    const reviewHandler = (review, requestId) => {
        console.log("clld");
        if (review != "approve" && review != "reject") return
        reviewRequest({ workspaceId, requestId, review })
    }
    useEffect(() => {
        if (isSuccess) toast.success(requestData?.message);
        if (isError) toast.error(error?.response?.data?.message);

    }, [isSuccess, requestData, isError, error])

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button className=" w-full rounded-2xl py-6 text-base font-medium bg-linear-to-r from-violet-400 via-purple-500 to-indigo-500  text-white shadow-md hover:opacity-90 transition-all">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Member
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Members
                        </DialogTitle>
                        <DialogDescription>
                            Review join requests to add new members to your workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-72 w-full rounded-md border">
                        <div className="p-4">
                            {data?.memberRequests?.map((request) => {
                                return (<React.Fragment key={request?._id}>
                                    <div className="flex items-center justify-between px-2 py-4 ">

                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={request?.user?.avatar} />
                                                <AvatarFallback>{request?.user?.name?.slice(0, 1)}</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="text-md font-semibold text-gray-800">
                                                    {request?.user?.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {request?.user?.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-1 px-2 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition" onClick={() => reviewHandler("approve", request?._id)}>
                                                <Check size={15} />
                                                Accept
                                            </button>

                                            <button className="flex items-center gap-1 px-2 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition" onClick={() => reviewHandler("reject", request?._id)}>
                                                <X size={15} />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                    <Separator className="my-2" />
                                </React.Fragment>)
                            })}
                        </div >
                    </ScrollArea>
                </DialogContent >
            </Dialog >
        </>
    )
}