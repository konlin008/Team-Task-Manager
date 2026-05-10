import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useFetchUserProjects } from "@/hooks/project.hook";
import useAuthStore from "@/store/useAuthStore";
import { CircleOff, Plus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

const Projects = () => {
    const [sort, setSort] = useState("");
    const { data } = useFetchUserProjects(sort);
    const user = useAuthStore((state) => state.user);
    console.log(data);

    const sortingcategories = [
        {
            field: "All Projects",
            sort: "",
        },
        {
            field: "Created By Me",
            sort: "owner",
        },
        {
            field: "Assigned",
            sort: "assigned",
        },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-10">
            <div>
                <h1 className="text-2xl font-bold text-black">Projects</h1>
                <p className="text-gray-500 mt-1">
                    Manage and Organize All Your Projetcts in One Place
                </p>
            </div>
            <div className="flex justify-end">
                <Button className={"p-5 rounded-sm bg-violet-600"}>
                    <Plus />
                    New Project
                </Button>
            </div>
            <div className="hidden md:flex items-center gap-8 text-md  text-gray-600 w-fit">
                {sortingcategories.map((sortingcategory) => {
                    return (
                        <p
                            key={sortingcategory.field}
                            className={`hover:text-purple-600 transition flex gap-2 items-center border-b border-gray-400 hover:border-purple-600 cursor-pointer
                                ${sort === sortingcategory.sort
                                    ? "text-purple-600 border-purple-600"
                                    : "border-gray-400 hover:text-purple-600 hover:border-purple-600"
                                }
                                
                                `}
                            onClick={() => {
                                setSort(sortingcategory.sort);
                            }}
                        >
                            {sortingcategory.field}
                        </p>
                    );
                })}
            </div>
            <Table>
                <TableCaption>A list of your All Projects.</TableCaption>
                <TableHeader>
                    <TableRow className={'text-lg'}>
                        <TableHead className="w:100px">project</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.projects
                            ?.map((project) => {
                                return (
                                    <TableRow key={project._id}>
                                        <TableCell className="font-medium">{project.title}</TableCell>
                                        <TableCell>
                                            {
                                                user._id === project.owner._id ? 'Me' : project.owner.name
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Badge>
                                                {project.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={'flex justify-end gap-1'}>
                                            {
                                                user._id === project.owner._id ? <>
                                                    <SquarePen size={20} />
                                                    <Trash2 size={20} />
                                                </> : <CircleOff size={20} />
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                    }

                </TableBody>
            </Table>
        </div>
    );
};

export default Projects;
