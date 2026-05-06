import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'
import useAuthStore from '@/store/useAuthStore'
import { useGetMe } from '@/hooks/auth.hook'

const Dashboard = () => {
    const { data: allWorkspace, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    const { refetch } = useGetMe();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get("auth") === "success") {
            refetch();
        }
    }, []);

    useEffect(() => {
        if (allWorkspaceIsError) toast.error(allWorkspaceError?.response?.data?.message);
    }, [allWorkspaceIsError, allWorkspaceError])

    return (
        <div className='w-full h-full flex flex-col gap-10'>
            <div>
                <h1 className='text-3xl font-semibold'>Hello Aman</h1>
                <p>Organize, track, and conquer your team’s work — all in one place.</p>
            </div>
            {allWorkspace?.workspace ?
                <>
                    <div className='flex gap-5'>
                        <div className='w-[60%]'>
                            <WorkspaceProjectsCard allWorkspace={allWorkspace} />
                        </div>
                        <div className='w-[40%]'>
                            <WorkspaceMembersCard workspaceId={allWorkspace?.workspace?._id} />
                        </div>
                    </div>
                </> :
                <NewUserDashboard />
            }
        </div>
    )
}

export default Dashboard


