import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import { Input } from '@/components/ui/input'
import { FcGoogle } from "react-icons/fc";
import { Button } from '@/components/ui/button'

const RegisterPage = () => {
    return (
        <div className='w-screen h-screen flex'>
            <div className='w-[35%] h-full px-20 py-20 bg-[#F4F5FC] flex flex-col gap-10'>
                <div className='flex items-center gap-2'>
                    <img src="/icon.png" alt="" className='w-15 h-15' />
                    <h1 className='font-heading font-semibold text-4xl mt-2'>Task<span className='text-blue-600'>Zen</span></h1>
                </div>
                <div className='flex flex-col gap-2 ml-2'>
                    <h2 className='font-heading  font-semibold text-3xl'>Create your account</h2>
                    <p className='text-gray-500'>Signup to get started</p>
                </div>
                <div className='w-full flex justify-center'>
                    <Card className="w-full max-w-sm rounded-sm h-100 flex flex-col gap-7 shadow-2xl shadow-indigo-700/50">
                        <CardHeader>
                        </CardHeader>
                        <CardContent className={'flex flex-col gap-2'}>
                            <form>
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-2">
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Full Name"
                                            required
                                            className="h-10"

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            className="h-10"

                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Input id="password" type="password" placeholder="Password" required className="h-10" />
                                    </div>
                                    <Button type="submit" className="w-full h-10 bg-blue-600">
                                        Register
                                    </Button>
                                </div>
                            </form>

                        </CardContent>
                        <CardFooter className="flex-col justify-center bg-white h-full gap-2">
                            <Button variant="outline" className="w-full h-10 ">
                                <FcGoogle className="w-10 h-10" /> Sign up with Google
                            </Button>
                            <p>Already have a account? <a href="/login" className='text-blue-600'>Login</a></p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className='w-[65%] bg-blue-500 h-full'>
                <img src="/authPageBg.png" alt="" className='h-full object-cover' />
            </div>

        </div>
    )
}

export default RegisterPage