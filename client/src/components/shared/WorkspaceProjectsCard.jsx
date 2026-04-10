import React, { useEffect, useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Pencil, Plus, Trash2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useCreateProject, useDeleteProject, useGetProjects } from '@/hooks/project.hook'
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
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const WorkspaceProjectsCard = ({ allWorkspace }) => {
    const nav = useNavigate()
    const { mutate: createProject } = useCreateProject();
    const {
        data: projectsData,
        isError: isProjectsError,
        error: projectsError,
    } = useGetProjects(allWorkspace?.workspace?._id);
    useEffect(() => {
        if (isProjectsError) toast.error(projectsError?.response?.data?.message);
    }, [isProjectsError])

    const { mutate: deleteProject } = useDeleteProject();
    const progress = 80
    return (
        <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
            <CardHeader>
                <CardTitle className={'font-semibold text-xl'}>{allWorkspace?.workspace?.title}</CardTitle>
                <CardDescription>{allWorkspace?.workspace?.title || ''}</CardDescription>
                <CardAction >
                    <Button
                        variant="outline"
                        className=" rounded-full px-4 py-2 text-sm font-medium text-violet-600 border-violet-200  bg-white/60 backdrop-blur-md hover:bg-violet-50 flex items-center gap-1">
                        View All
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent className={'flex flex-col gap-5'}>
                <div className='flex flex-col gap-2'>
                    {
                        projectsData?.projects?.map((project) => {
                            return (
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border" key={project?._id}  >

                                    <div className="flex-1" onClick={() => nav(`/project-details/${project?._id}`)}>
                                        <h3 className="text-sm font-medium text-gray-800 mb-2">
                                            {project?.title}
                                        </h3>
                                        <p className='text-sm font-medium text-gray-500 mb-2'>
                                            {project?.description}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <Progress value={progress} className="h-2 flex-1" />
                                            <span className="text-xs text-gray-500 font-medium">
                                                {progress}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Button variant="outline" size="icon" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => deleteProject(project?._id)
                                        }>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <AddProjectCard createProject={createProject} workspace={allWorkspace?.workspace?._id} />

            </CardContent>
        </Card>
    )
}

export default WorkspaceProjectsCard


const AddProjectCard = ({ createProject, workspace }) => {
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


