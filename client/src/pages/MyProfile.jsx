import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpdateProfile } from '@/hooks/auth.hook'
import useAuthStore from '@/store/useAuthStore'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { mutate, isPending } = useUpdateProfile();
  const [name, setName] = useState('')


  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <div>
        <h1 className="text-4xl font-bold text-black">
          My Profile
        </h1>
        <p className="text-gray-500 mt-1">
          View and manage your personal information
        </p>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-end ' >
          <Dialog>
            <DialogTrigger asChild>
              <Button className={'p-5 rounded-sm bg-violet-600'}>
                <Pencil /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline"
                    className="px-6 py-5 rounded-xl border-violet-300 text-violet-600 hover:bg-violet-50" >Cancel</Button>
                </DialogClose>
                <Button onClick={() => { mutate({ name }) }} type="submit" className="bg-linear-to-r from-violet-500 to-purple-500 text-white px-6 py-5 rounded-xl shadow-md hover:opacity-90 transition">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
        <Card className={'rounded-md h-50 py-10 px-10 w-100  aspect-video bg-white/20 shadow-lg'}>
          <div className='flex items-center gap-3'>
            <div >
              <Avatar className={'w-25 h-25'} >
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className='font-semibold text-xl'>{user?.name}</h3>
              <p className='text-gray-400'>{user?.email}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile