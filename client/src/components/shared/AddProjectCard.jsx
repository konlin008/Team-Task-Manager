import { useCreateProject } from "@/hooks/project.hook";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Plus } from 'lucide-react'
import { Button } from "../ui/button";

const AddProjectCard = ({ workspace }) => {
    const { mutate: createProject } = useCreateProject();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button className="w-full rounded-2xl py-6 text-base font-medium bg-linear-to-r from-violet-400 via-purple-500 to-indigo-500 text-white shadow-md hover:opacity-90 transition-all">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Project
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create New Project
                    </DialogTitle>
                    <DialogDescription>
                        Add a new project to your workspace and start tracking progress.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createProject({ title, description, workspace })
                        setTitle("")
                        setDescription("")
                    }}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                            id="projectName"
                            name="title"
                            placeholder="Enter project name..."
                            className='h-10'
                            value={title}
                            required
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter project description..."
                            className="min-h-20 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button variant="outline" className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition"
                            >
                                Create Project
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default AddProjectCard