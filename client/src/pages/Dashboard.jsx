import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSearchInviteCode } from '@/hooks/user.api'
import { useCreateWorksapce } from '@/hooks/workspace.hook'
import { LogIn, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const Workspace = false
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    const { mutate, isError, isSuccess, data, error } = useCreateWorksapce()
    const { data: workSpaceDetails, refetch, isFetching } = useSearchInviteCode(inviteCode)

    const createWorkspace = () => {
        if (title.length === 0) return toast.error("Title Required")
        mutate({ title, description });
        setTitle("")
        setDescription("")
    }
    useEffect(() => {
        if (isError) {
            console.log(error?.response?.data?.message || "Something Went Wrong");
        }
        if (isSuccess) toast.success(data?.message || 'Workspace Created Successfully');

    }, [isError, isSuccess])
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
                                <Dialog>
                                    <form >
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition"
                                            >
                                                <Plus className="mr-2 h-5 w-5" />
                                                Create Workspace
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Create Workspace</DialogTitle>
                                                <DialogDescription>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <FieldGroup>
                                                <Field>
                                                    <Label htmlFor="title">Workspace Title</Label>
                                                    <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </Field>
                                                <Field>
                                                    <Label htmlFor="description">Description</Label>
                                                    <Textarea id="description" placeholder="Enter workspace description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                </Field>
                                            </FieldGroup>
                                            <DialogFooter className={'mt-10 border-t-0'}>
                                                <DialogClose asChild>
                                                    <Button variant="outline"
                                                        className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50">Cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button onClick={createWorkspace} className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition" >Create</Button>
                                                </DialogClose>

                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                                <Dialog>
                                    <form >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50"
                                            >
                                                <LogIn className="mr-2 h-5 w-5" />
                                                Join Workspace
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md h-90 flex flex-col gap-5">
                                            <DialogHeader>
                                                <DialogTitle>Join Workspace</DialogTitle>
                                                <DialogDescription>
                                                    Enter the invitation code you received to join an existing workspace.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <FieldGroup>
                                                <Field orientation="horizontal">
                                                    <Input type="search" placeholder="invitation code" className={'py-5'} />
                                                    <Button onClick={createWorkspace} className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition" >Search</Button>
                                                </Field>
                                            </FieldGroup>
                                            <div></div>
                                        </DialogContent>
                                    </form>
                                </Dialog>

                            </div>
                        </div>

                    </div>
                </>}

        </div>
    )
}

export default Dashboard