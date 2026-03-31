import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, Plus } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
    const Workspace = false
    return (
        <div className='w-full min-h-[calc(100vh-80px)] bg-[#F3F2FB] px-20 py-10 bg-[url(/bg.png)] bg-cover flex flex-col gap-10 '>
            <div>
                <h1 className='text-3xl font-semibold'>Hello Aman</h1>
                <p>Organize, track, and conquer your team’s work — all in one place.</p>
            </div>
            {Workspace ?
                <>

                    <div className='flex gap-5'>
                        <div className='w-[60%]'>
                            <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
                                <CardHeader>
                                    <CardTitle className={'font-semibold text-xl'}>Your Workspaces</CardTitle>
                                    <CardDescription>Organize tasks, collaborate with your team, and track progress efficiently.</CardDescription>
                                    <CardAction>Card Action</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>

                            </Card>
                        </div>
                        <div className='w-[40%]'>
                            <Card className={'bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg'}>
                                <CardHeader>
                                    <CardTitle>Team</CardTitle>
                                    <CardDescription>Manage projects, track progress, and keep your team aligned.</CardDescription>
                                    <CardAction>Member</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </> :
                <>
                    <div className=' w-[90%] flex pt-20 items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            <div className='h-50 w-75 bg-[url(/g.png)] bg-cover'></div>
                            <h3 className='font-semibold'>No Workspace yet</h3>
                            <p>
                                Create or Join a new  workspace to start collaborating with your team.
                            </p>
                            <div className="flex gap-4 justify-center mt-6">

                                <Button
                                    className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    Create Workspace
                                </Button>

                                <Button
                                    variant="outline"
                                    className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50"
                                >
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Join Workspace
                                </Button>

                            </div>
                        </div>

                    </div>
                </>}

        </div>
    )
}

export default Dashboard