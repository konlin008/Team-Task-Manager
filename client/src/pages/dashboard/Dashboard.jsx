import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'
import { useGetMe } from '@/hooks/auth.hook'
import useAuthStore from '@/store/useAuthStore'
import useWorkspaceStore from '@/store/useWorkspaceStore'

const Dashboard = () => {
    const { data: allWorkspace, isSuccess: allWorkspaceIsSuccess, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    const { refetch } = useGetMe();
    const setUser = useAuthStore((state) => state.setUser);
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


