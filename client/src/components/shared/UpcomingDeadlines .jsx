import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

const UpcomingDeadlines = ({ tasks, isLoading }) => {
    const nav = useNavigate()
    const priorityColor = {
        Low: 'bg-green-100 text-green-600',
        Medium: 'bg-yellow-100 text-yellow-600',
        High: 'bg-red-100 text-red-600',
    }

    if (!isLoading) {
        return (
            <Card className="rounded-md shadow-lg bg-white/20">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Upcoming Deadlines
                    </CardTitle>
                    <CardAction>
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

                <CardContent className="space-y-4">

                    {tasks?.map((task) => (
                        <div
                            key={task._id}
                            className="flex items-center justify-between p-4 rounded-xl border bg-white/60"
                        >

                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-sm">
                                    {task.title}
                                </p>

                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]}`}
                                    >
                                        {task.priority}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {task.status}
                                    </span>
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground">
                                Due Soon
                            </div>

                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card className="rounded-md shadow-lg bg-white/20">
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <Skeleton className="h-6 w-44 rounded-md" />

                        <CardAction>
                            <Skeleton className="h-10 w-28 rounded-full" />
                        </CardAction>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between p-4 rounded-xl border bg-white/60"
                        >
                            <div className="flex flex-col gap-3">
                                <Skeleton className="h-4 w-40 rounded-md" />

                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-md" />
                                </div>
                            </div>

                            <Skeleton className="h-4 w-16 rounded-md" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }
}

export default UpcomingDeadlines
