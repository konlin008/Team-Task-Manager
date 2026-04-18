import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SquarePen } from "lucide-react";
import { useEditTask } from "@/hooks/task.hooks";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const EditTask = ({ task }) => {
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };
    const { mutate: editTask } = useEditTask()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: task.title,
            description: task.description,
            priority: task.priority.toLowerCase(),
            dueDate: formatDate(task.dueDate),
        },
    });

    const priority = watch("priority");

    const onSubmit = (data) => {
        editTask({
            payload: data,
            taskId: task.id,
        });
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
                <Button
                    variant="outline"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                >
                    <SquarePen size={18} />
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

                        <div className="flex flex-col gap-2 flex-1">
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    value={watch("priority")}
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

                        <DialogClose asChild>
                            <Button
                                type="submit"
                                className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition"
                            >
                                Edit Task
                            </Button>
                        </DialogClose>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditTask;