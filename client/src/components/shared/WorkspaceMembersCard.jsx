import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ChevronRight, Plus, Trash2, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAllMembers } from '@/hooks/workspace.hook'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import AddMemberCard from './AddMemberCard'
import WorkspaceProjectsCardSkeleton from './WorkspaceProjectsCardSkeleton '

const WorkspaceMembersCard = ({ workspaceId }) => {
    const { data, isLoading, error } = useAllMembers(workspaceId)
    useEffect(() => {
        if (error) toast.error(error.response.data.message);
    }, [error])
    if (!isLoading) {
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
                            data?.members?.slice(0, 5).map((member) => {
                                return (
                                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border" key={member?._id}>

                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-5 w-5">
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
                                            <Trash2 className="h-2 w-2" />
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
    } else {
        return (
            <WorkspaceProjectsCardSkeleton />
        )
    }
}


export default WorkspaceMembersCard