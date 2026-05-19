import React, { useEffect } from 'react'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ChevronRight, ClipboardList, List, TrendingUp } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AllTaskCard = ({ data, isLoading, isError, error }) => {
    const nav = useNavigate()

    useEffect(() => {
        if (isError) toast.error(error?.response?.data?.message);
    }, [data, isError, error])

    const todoTasksSize =
        data?.tasks?.filter(task => task.status === 'todo').length || 0;

    const inProgressTasksSize =
        data?.tasks?.filter(task => task.status === 'inProgress').length || 0;

    const doneTasksSize =
        data?.tasks?.filter(task => task.status === 'done').length || 0;

    if (!isLoading) {
        return (
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
        )
    } else {
        return (
            <Card className="rounded-md bg-white/20 shadow-lg p-6 flex-1 h-fit">
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <Skeleton className="h-6 w-32 rounded-md" />

                        <CardAction>
                            <Skeleton className="h-10 w-28 rounded-full" />
                        </CardAction>
                    </div>
                </CardHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <Card
                            key={item}
                            className="hover:shadow-md transition"
                        >
                            <CardContent className="flex items-center gap-4 p-5">
                                <Skeleton className="h-12 w-12 rounded-lg" />

                                <div className="space-y-2">
                                    <Skeleton className="h-7 w-12 rounded-md" />
                                    <Skeleton className="h-4 w-24 rounded-md" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Card>
        )
    }

}

export default AllTaskCard