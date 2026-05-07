import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import React from 'react'

const MyProfile = () => {
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
          <Button className={'p-5 rounded-sm bg-violet-600'}>
            <Pencil /> Edit Profile
          </Button>
        </div>
        <Card className={'rounded-md h-50 py-10 px-10  aspect-video bg-white/20 shadow-lg'}>
          <div className='flex items-center gap-3'>
            <div >
              <Avatar className={'w-25 h-25'} >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3>Aman Mondal</h3>
              <p>@amanGmail.com</p>
            </div>
          </div>
          <div>

          </div>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile