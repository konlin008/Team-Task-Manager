import React from 'react'
import { Card, CardContent } from '../../../components/ui/card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Task from './Task'

const Column = ({ tasks }) => {
    return (
        <Card className={'rounded-md'}>
            <CardContent>
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {
                        tasks.map((task) => {
                            return (
                                <Task id={task.id} title={task.title} key={task.id} />
                            )
                        })
                    }
                </SortableContext>
            </CardContent>
        </Card>
    )
}

export default Column