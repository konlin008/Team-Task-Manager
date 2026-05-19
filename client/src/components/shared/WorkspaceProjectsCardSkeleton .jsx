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
            <CardContent className="flex flex-col gap-5">

                <div className="flex flex-col gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 gap-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm border">

                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton className="h-4  rounded-full" />
                                <Skeleton className="h-3 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkspaceProjectsCardSkeleton