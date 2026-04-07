import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Plus, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const WorkspaceMembersCard = () => {
    return (
        <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
            <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>Manage projects, track progress, and keep your team aligned.</CardDescription>
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
                        [1, 2, 3, 4,].map((e) => {
                            return (
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border" key={e}>

                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                                            <AvatarFallback>SJ</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800">
                                                Sarah Johnson
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                Frontend Developer
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>
                <Button className=" w-full rounded-2xl py-6 text-base font-medium bg-linear-to-r from-violet-400 via-purple-500 to-indigo-500  text-white shadow-md hover:opacity-90 transition-all">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Member
                </Button>
            </CardContent>
        </Card>
    )
}

export default WorkspaceMembersCard