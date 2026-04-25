import React, { useEffect, } from 'react'
import TaskProgresstab from './TaskProgresstab'
import KanbanBoard from '../../components/kanbanBoard/KanbanBoard'
import { useParams } from 'react-router-dom';
import { useAllTask } from '@/hooks/task.hooks';
import { useProjectDetails } from '@/hooks/project.hook';


const ProjectDetails = () => {
    const { id } = useParams();
    const { data: ProjectDetails, isSuccess: projectIsSuccess, isError: projectDetailsIsError, error: projectDetailsError } = useProjectDetails(id)
    const { data: tasks, isSuccess: tasksSucess, isError: tasksIsError, error: tasksError } = useAllTask(id)
    useEffect(() => {
        if (projectIsSuccess) {
            console.log(ProjectDetails);
        }
        if (projectDetailsIsError) console.log(projectDetailsError?.response?.data?.message);
    }, [ProjectDetails, projectIsSuccess, projectDetailsIsError, projectDetailsError,])
    useEffect(() => {
        if (tasksSucess) {
            console.log(tasks);
        }
        if (tasksIsError) console.log(tasksError?.response?.data?.message);
    }, [tasks, tasksSucess, tasksIsError, tasksError,])
    return (
        <div className='w-full h-full flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
                <h1 className='font-semibold text-2xl'>{ProjectDetails?.project?.title}</h1>
                <p className='text-md text-gray-600'>{ProjectDetails?.project?.description}</p>
            </div>
            <TaskProgresstab tasks={tasks?.tasks} projectId={id} />
            <KanbanBoard tasks={tasks?.tasks} projectId={id} />
        </div>

    )
}

export default ProjectDetails