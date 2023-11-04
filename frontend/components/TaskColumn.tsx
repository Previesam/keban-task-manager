import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

export default function TaskColumn({ column, tasks, moveTask, setTasks }: any) {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK_CARD',
        drop: (item: any) => {
            console.log(item)
            // if (item.columnId !== column.id) {
            moveTask(item.task, [...tasks].filter(i => i.status == column.title).length, item.columnId, column.id);
            // }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div className={`kanban-column w-[calc(100%/4-8px)]`}>
            <h2 className='text-sm font-semibold mb-[20px]'>{column.title}</h2>
            <div ref={drop} className={`column ${isOver ? 'border dark:border-gray-600' : ''} h-full min-h-[500px] max-h-[500px] overflow-y-auto rounded`}>
                <div className={`grid gap-2`}>
                    {[...tasks].filter(i => i.status == column.title).map((task: any, index: any) => (
                        <TaskCard key={task.id} task={task} index={index} columnId={column.id} setTasks={setTasks} />
                    ))}
                </div>
            </div>
        </div>
    );
}