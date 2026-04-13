import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAllTask, useCreateTask } from '@/hooks/task.hooks'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const TaskProgresstab = () => {
    const { id } = useParams();
    const { data: tasks, isSuccess: tasksSucess, isError: tasksIsError, error: tasksError } = useAllTask(id)
    useEffect(() => {
        if (tasksSucess) console.log(tasks);
        if (tasksIsError) console.log(tasksError?.response?.data?.message);
    }, [tasks, tasksSucess, tasksIsError, tasksError])
    return (
        <Card className={"rounded-md h-40  aspect-video bg-white/20 shadow-lg "}>
            <CardContent className={'flex justify-between items-center h-full px-10'}>
                <div className={'w-70 h-full  bg-white/70 backdrop-blur-lg border border-white/40  rounded-sm flex flex-col items-center justify-center  '}>
                    <h3 className='text-xl font-semibold'>12</h3>
                    <p>Total Task</p>
                </div>
                <div className={'w-70 h-full bg-white/70 backdrop-blur-lg border border-white/40 rounded-sm flex flex-col items-center justify-center'}>
                    <h3 className='text-xl font-semibold'>5</h3>
                    <p>Completed</p>
                </div>
                <div className={'w-70 h-full bg-white/70 backdrop-blur-lg border border-white/40 rounded-sm flex flex-col items-center justify-center'}>
                    <h3 className='text-xl font-semibold'>7</h3>
                    <p>Pending</p>
                </div>
                <div className={'w-50 rounded-sm flex items-center justify-center'}>
                    <AddTaskDialog projectId={id} />
                </div>

            </CardContent>
        </Card>
    )
}

export default TaskProgresstab

const AddTaskDialog = ({ projectId }) => {
    const { mutate: createTask } = useCreateTask()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "todo",
            priority: "Medium",
            dueDate: "",
        },
    });

    const priority = watch("priority");

    const onSubmit = (data) => {
        createTask({ ...data, projectId })
        reset();
    };

    const getPriorityColor = () => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-600";
            case "Low":
                return "bg-green-100 text-green-600";
            default:
                return "bg-yellow-100 text-yellow-600";
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-5 py-5 rounded-lg">
                    Add Task
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Add New Task
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            className="h-10"
                            placeholder="Enter task title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Add a short description..."
                            {...register("description")}
                        />
                    </div>

                    <div className="flex gap-4">

                        <div className="flex-1 space-y-2">
                            <Label>Status</Label>
                            <Select
                                defaultValue="todo"
                                onValueChange={(value) => setValue("status", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    defaultValue="Medium"
                                    onValueChange={(value) => setValue("priority", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <span
                                className={`px-3 py-1 text-sm rounded-full w-fit ${getPriorityColor()}`}
                            >
                                • {priority}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Due Date</Label>
                        <Input
                            type="date"
                            className="h-10"
                            {...register("dueDate")}
                        />
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition"
                        >
                            Create Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};