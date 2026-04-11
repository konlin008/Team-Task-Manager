import React, { useState } from 'react'
import { closestCorners, DndContext } from '@dnd-kit/core'
import Column from '@/pages/project/kanbanBoard/Column'

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Add Text' },
        { id: 2, title: 'Fix Styling' },
        { id: 3, title: 'center div' }
    ])
    return (
        <div>
            <h1>tasks</h1>
            <DndContext collisionDetection={closestCorners}>
                <Column tasks={tasks} />
            </DndContext>
        </div>
    )
}

export default KanbanBoard