import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const { data: allWorkspace, isSuccess: allWorkspaceIsSuccess, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
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
                            <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
                                <CardHeader>
                                    <CardTitle className={'font-semibold text-xl'}>Your Workspaces</CardTitle>
                                    <CardDescription>Organize tasks, collaborate with your team, and track progress efficiently.</CardDescription>
                                    <CardAction>Card Action</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>

                            </Card>
                        </div>
                        <div className='w-[40%]'>
                            <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
                                <CardHeader>
                                    <CardTitle>Team</CardTitle>
                                    <CardDescription>Manage projects, track progress, and keep your team aligned.</CardDescription>
                                    <CardAction>Member</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </> :
                <NewUserDashboard />
            }

        </div>
    )
}

export default Dashboard