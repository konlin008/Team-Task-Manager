import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'

const UpcomingDeadlines = ({ tasks }) => {

    const priorityColor = {
        Low: 'bg-green-100 text-green-600',
        Medium: 'bg-yellow-100 text-yellow-600',
        High: 'bg-red-100 text-red-600',
    }
    const nav = useNavigate()

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
}

export default UpcomingDeadlines
