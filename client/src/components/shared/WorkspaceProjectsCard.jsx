import React, { useEffect } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Trash2 } from 'lucide-react'
import { useDeleteProject, useGetProjects } from '@/hooks/project.hook'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AddProjectCard from './AddProjectCard'

const WorkspaceProjectsCard = ({ allWorkspace }) => {
    const nav = useNavigate()
    const {
        data: projectsData,
        isError: isProjectsError,
        error: projectsError,
    } = useGetProjects(allWorkspace?.workspace?._id);
    useEffect(() => {
        if (isProjectsError) toast.error(projectsError?.response?.data?.message);
    }, [isProjectsError])

    const { mutate: deleteProject } = useDeleteProject();
    return (
        <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
            <CardHeader>
                <CardTitle className={'font-semibold text-xl'}>{allWorkspace?.workspace?.title}</CardTitle>
                <CardDescription>{allWorkspace?.workspace?.title || ''}</CardDescription>
                <CardAction >
                    <Button
                        variant="outline"
                        className=" rounded-full px-4 py-2 text-sm font-medium text-violet-600 border-violet-200  bg-white/20 shadow-lg backdrop-blur-md hover:bg-violet-50 flex items-center gap-1"
                        onClick={() => nav('/projects')}
                    >
                        View All
                        <ChevronRight className="h-4 w-4" />

                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent className={'flex flex-col gap-5'}>
                <div className='flex flex-col gap-2'>
                    {
                        projectsData?.projects?.slice(0, 4).map((project) => {
                            return (
                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border" key={project?._id}  >
                                    <div className="flex-1" onClick={() => nav(`/project-details/${project?._id}`)}>
                                        <h3 className="text-sm font-medium text-gray-800 mb-2">
                                            {project?.title}
                                        </h3>
                                        <p className='text-sm w-80 font-medium text-gray-500 mb-2 truncate'>
                                            {project?.description}
                                        </p>
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
                <AddProjectCard workspace={allWorkspace?.workspace?._id} />

            </CardContent>
        </Card>
    )
}

export default WorkspaceProjectsCard




