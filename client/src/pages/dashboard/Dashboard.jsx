import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'
import { useGetMe } from '@/hooks/auth.hook'
import useAuthStore from '@/store/useAuthStore'

const Dashboard = () => {
    const { data: allWorkspace, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    const { refetch, data: getMeData, isSuccess: getMeSuccess } = useGetMe()
    const params = new URLSearchParams(window.location.search);
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        if (allWorkspaceIsError) toast.error(allWorkspaceError?.response?.data?.message);
    }, [allWorkspaceIsError])

    if (params.get("auth") === "success") {
        refetch()
    }
    if (user) {
        console.log("User is logged in:", user);
    } else {
        console.log("No user");
    }
    return (
        <div className='w-full h-full flex flex-col gap-10'>
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


