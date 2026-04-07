import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { ChevronRight, Plus, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'

const Dashboard = () => {
    const { data: allWorkspace, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    useEffect(() => {
        if (allWorkspaceIsError) toast.error(allWorkspaceError?.response?.data?.message);
    }, [allWorkspaceIsError])


    return (
        <div className='w-full min-h-[calc(100vh-80px)] bg-[#F3F2FB] px-20 py-10 bg-[url(/bg.png)] bg-cover flex flex-col gap-10 '>
            <div>
                <h1 className='text-3xl font-semibold'>Hello Aman</h1>
                <p>Organize, track, and conquer your team’s work — all in one place.</p>
            </div>
            {allWorkspace?.workspace ?
                <>
                    {console.log(allWorkspace?.workspace)}
                    <div className='flex gap-5'>
                        <div className='w-[60%]'>
                            <WorkspaceProjectsCard allWorkspace={allWorkspace} />
                        </div>
                        <div className='w-[40%]'>
                            <WorkspaceMembersCard />
                        </div>
                    </div>
                </> :
                <NewUserDashboard />
            }

        </div>
    )
}

export default Dashboard


