import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAssignedTasks } from '@/hooks/user.hooks'
import { CheckLine, ClipboardList, List, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const MyTaskPage = () => {
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
            <h1 className='font-semibold text-2xl'>My Task</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <Card className="hover:shadow-md transition">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="bg-violet-100 p-3 rounded-lg">
                            <ClipboardList className="text-violet-600" size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{data?.tasks?.length}</p>
                            <p className="text-sm text-muted-foreground">Total Assigned</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="bg-yellow-100 p-3 rounded-lg">
                            <List className="text-yellow-600" size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{todoTasksSize}</p>
                            <p className="text-sm text-muted-foreground">To Do</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <TrendingUp className="text-blue-600" size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{inProgressTasksSize}</p>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition">
                    <CardContent className="flex items-center gap-4 p-5">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckLine className="text-green-600" size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{doneTasksSize}</p>
                            <p className="text-sm text-muted-foreground">Done</p>
                        </div>
                    </CardContent>
                </Card>

            </div>
            <Table >
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader >
                    <TableRow className={'font-semibold'}>
                        <TableHead className="w:100px font-semibold">Task</TableHead>
                        <TableHead className=" font-semibold">Project</TableHead>
                        <TableHead className=" font-semibold">Priority</TableHead>
                        <TableHead className="text-right font-semibold">Due Data</TableHead>
                        <TableHead className="text-right font-semibold">Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.tasks?.map((task) => {
                        return (
                            <TableRow key={task._id}>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>{task?.project?.title}</TableCell>
                                <TableCell>
                                    {
                                        task?.priority === 'Low' ? <Badge className=" px-4 bg-green-400 text-green-800 dark:bg-green-950 dark:text-green-300" >
                                            • Low</Badge> : task?.priority === 'High' ? <Badge variant="destructive" className=" px-4 text-red-700 dark:bg-red-950 dark:text-red-300" >• High</Badge> : <Badge variant="destructive"
                                                className=" px-4 bg-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" >• Medium</Badge>
                                    }
                                </TableCell>
                                <TableCell className="text-right">{new Date(task?.dueDate).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}</TableCell>
                                <TableCell className="text-right">
                                    {
                                        task?.status === 'done' ? <Badge className=" px-4 bg-green-400 text-green-800 dark:bg-green-950 dark:text-green-300" >
                                            • Done</Badge>
                                            :
                                            task?.status === 'inProgress' ? <Badge className="  text-violet-700 bg-violet-400" >• In Progress</Badge>
                                                :
                                                <Badge className=" bg-yellow-200 text-yellow-700">• Todo</Badge>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div >
    )
}
export default MyTaskPage