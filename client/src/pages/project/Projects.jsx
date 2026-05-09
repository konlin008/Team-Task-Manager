import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useFetchUserProjects } from '@/hooks/project.hook'
import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'

const Projects = () => {
    const { data } = useFetchUserProjects()
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div className='w-full h-full flex flex-col gap-10' >
            <div>
                <h1 className="text-2xl font-bold text-black">Projects</h1>
                <p className="text-gray-500 mt-1">Manage and Organize All Your Projetcts in One Place</p>
            </div>
            <div className='flex justify-end'>
                <Button className={'p-5 rounded-sm bg-violet-600'}>
                    <Plus />
                    New Project
                </Button>
            </div>
            <div className="hidden md:flex items-center gap-8 text-md  text-gray-600 w-fit">
                <p className="hover:text-purple-600 transition flex gap-2 items-center border-b border-gray-400 hover:border-purple-600 cursor-pointer">All Projects</p>
                <p className="hover:text-purple-600 transition border-b border-gray-400 hover:border-purple-600 cursor-pointer">Created By Me</p>
                <p className="hover:text-purple-600 transition border-b border-gray-400 hover:border-purple-600 cursor-pointer">Assigned</p>
            </div>
            <Table>
                <TableCaption>A list of your All Projects.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w:100px">project</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Abcd project</TableCell>
                        <TableCell>Me</TableCell>
                        <TableCell>karan,ajula</TableCell>
                        <TableCell className="text-right"> Edit </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default Projects