"use client"

import { format } from "date-fns";
import { useDrag, useDrop } from "react-dnd";
import Icon from "./Icon";
import AddEditTaskModal from "./AddEditTaskModal";

export default function TaskCard({ task, index, columnId, setTasks }: any) {
    const [, ref] = useDrag({
        type: 'TASK_CARD',
        item: { index, columnId, task },
    });
    function onUpdateSuccess(task: any) {
        setTasks((prev: any) => prev.map((item: any) => {
            if (item?.id == task?.id) {
                return task
            } else {
                return item
            }
        }))
    }
    return (
        <AddEditTaskModal data={task} onSuccess={onUpdateSuccess}>
            <div ref={ref} className={`task-card transition-all animate-in zoom-in rounded-lg overflow-hidden border-l-[10px] border dark:border-gray-600 p-[16px] cursor-move ${task?.status?.toLowerCase()?.replace(" ", "_")}`}>
                <h4 className='text-black dark:text-white text-sm font-semibold mb-1'>{task.details}</h4>
                <p className="text-[10px] flex items-center gap-1"><Icon icon="mdi:clock-outline" className="text-base" /> {format(new Date(task.deadline), "dd MMM, yyyy p")}</p>
            </div>
        </AddEditTaskModal>
    );
}