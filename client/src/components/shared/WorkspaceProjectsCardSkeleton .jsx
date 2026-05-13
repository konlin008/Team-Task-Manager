import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const WorkspaceProjectsCardSkeleton = () => {
    return (
        <Card className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
            <CardHeader>
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-6 w-52 rounded-full" />
                    <Skeleton className="h-4 w-36 rounded-full" />
                </div>

                <CardAction>
                    <Skeleton className="h-10 w-28 rounded-full" />
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">

                <div className="flex flex-col gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border"
                        >
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton className="h-4 w-40 rounded-full" />
                                <Skeleton className="h-3 w-72 rounded-full" />
                            </div>

                            <Skeleton className="h-10 w-10 rounded-xl ml-4" />
                        </div>
                    ))}
                </div>
                <div className="border border-dashed rounded-2xl p-6 flex items-center justify-center">
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>

            </CardContent>
        </Card>
    )
}

export default WorkspaceProjectsCardSkeleton