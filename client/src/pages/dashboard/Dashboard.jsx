import NewUserDashboard from './NewUserDashboard'
import { useAllWorkspace } from '@/hooks/workspace.hook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import WorkspaceProjectsCard from '@/components/shared/WorkspaceProjectsCard'
import WorkspaceMembersCard from '@/components/shared/WorkspaceMembersCard'
import { useGetMe } from '@/hooks/auth.hook'
import useAuthStore from '@/store/useAuthStore'
import useWorkspaceStore from '@/store/useWorkspaceStore'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import WorkspaceProjectsCardSkeleton from '@/components/shared/WorkspaceProjectsCardSkeleton '
import { useAssignedTasks } from '@/hooks/user.hooks'
import { CheckCircle2, ChevronRight, ClipboardList, List, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import UpcomingDeadlines from '@/components/shared/UpcomingDeadlines '

const Dashboard = () => {
    const { data: allWorkspace, isLoading, isSuccess: allWorkspaceIsSuccess, isError: allWorkspaceIsError, error: allWorkspaceError } = useAllWorkspace()
    const { refetch } = useGetMe();
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user)
    console.log(user);
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace)
    const nav = useNavigate()
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

    const { data, isSuccess, isError, error } = useAssignedTasks()

    useEffect(() => {
        if (isError) toast.error(error?.response?.data?.message);
    }, [data, isSuccess, isError, error])
    const todoTasksSize =
        data?.tasks?.filter(task => task.status === 'todo').length || 0;

    const inProgressTasksSize =
        data?.tasks?.filter(task => task.status === 'inProgress').length || 0;

    const doneTasksSize =
        data?.tasks?.filter(task => task.status === 'done').length || 0;

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
                            {isLoading
                                ? <WorkspaceProjectsCardSkeleton />
                                : <WorkspaceProjectsCard allWorkspace={allWorkspace} />
                            }
                        </div>

                        <div className='w-[20%]'>
                            <WorkspaceMembersCard workspaceId={allWorkspace?.workspace?._id} />
                        </div>

                        <div>
                            <Card className="rounded-md bg-white/20 shadow-lg p-6 flex-1 h-fit">
                                <CardHeader>
                                    <CardTitle className='font-semibold text-xl'>All Tasks</CardTitle>
                                    <CardAction >
                                        <Button
                                            variant="outline"
                                            className=" rounded-full px-4 py-2 text-sm font-medium text-violet-600 border-violet-200  bg-white/20 shadow-lg backdrop-blur-md hover:bg-violet-50 flex items-center gap-1"
                                            onClick={() => nav('/tasks')}
                                        >
                                            View All
                                            <ChevronRight className="h-4 w-4" />

                                        </Button>
                                    </CardAction>
                                </CardHeader>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="flex items-center gap-4 p-5">
                                            <div className="bg-violet-100 p-3 rounded-lg">
                                                <ClipboardList
                                                    className="text-violet-600"
                                                    size={22}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {data?.tasks?.length}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Total Assigned
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="flex items-center gap-4 p-5">
                                            <div className="bg-yellow-100 p-3 rounded-lg">
                                                <List
                                                    className="text-yellow-600"
                                                    size={22}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {todoTasksSize}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    To Do
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="flex items-center gap-4 p-5">
                                            <div className="bg-blue-100 p-3 rounded-lg">
                                                <TrendingUp
                                                    className="text-blue-600"
                                                    size={22}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {inProgressTasksSize}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    In Progress
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="hover:shadow-md transition">
                                        <CardContent className="flex items-center gap-4 p-5">
                                            <div className="bg-green-100 p-3 rounded-lg">
                                                <CheckCircle2
                                                    className="text-green-600"
                                                    size={22}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-2xl font-bold">
                                                    {doneTasksSize}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    Done
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </Card>
                            <UpcomingDeadlines tasks={data?.tasks} />
                        </div>

                    </div>
                </> :
                <NewUserDashboard />
            }
        </div >
    )
}

export default Dashboard


