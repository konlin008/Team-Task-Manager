import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'
import { useGetMe } from '@/hooks/auth.hook'
import useAuthStore from '@/store/useAuthStore'
import useWorkspaceStore from '@/store/useWorkspaceStore'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import UpcomingDeadlines from '@/components/shared/UpcomingDeadlines '
import AllTaskCard from '@/components/shared/AllTaskCard'
import { useAssignedTasks } from '@/hooks/user.hooks'

const Dashboard = () => {
    const { data: allWorkspace, isSuccess: allWorkspaceIsSuccess, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    const { data, isLoading, isError, error } = useAssignedTasks()
    const { refetch } = useGetMe();
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user)
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace)


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get("auth") === "success") {
            refetch().then((res) => {
                if (res.data?.user) {
                    setUser(res.data.user);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (allWorkspaceIsSuccess) {
            setWorkspace(allWorkspace?.workspace)
        }
        if (allWorkspaceIsError) toast.error(allWorkspaceError?.response?.data?.message);
    }, [allWorkspaceIsError, allWorkspaceError, allWorkspaceIsSuccess, allWorkspace])

    return (
        <div className='w-full h-full flex flex-col gap-10'>

            {allWorkspace?.workspace ?
                <>
                    <Card className={'rounded-md h-40  aspect-video bg-white/20 shadow-lg '}>
                        <CardHeader className={'flex flex-col gap-5 mt-5'}>
                            <CardTitle className={'text-2xl'}>Hello {user?.name}</CardTitle>
                            <CardDescription >Organize, track, and conquer your team’s work — all in one place.</CardDescription>
                        </CardHeader>
                    </Card>
                    <div className='flex gap-5 items-start'>

                        <div className='w-[30%]'>
                            <WorkspaceProjectsCard allWorkspace={allWorkspace} />
                        </div>

                        <div className='w-[20%]'>
                            <WorkspaceMembersCard workspaceId={allWorkspace?.workspace?._id} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <AllTaskCard data={data} isLoading={isLoading} isError={isError} error={error} />
                            <UpcomingDeadlines tasks={data?.tasks} isLoading={isLoading} />
                        </div>

                    </div>
                </> :
                <NewUserDashboard />
            }
        </div >
    )
}

export default Dashboard


