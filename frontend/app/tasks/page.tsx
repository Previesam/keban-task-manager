"use client";

import AddEditTaskModal from "@/components/AddEditTaskModal";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import TaskColumn from "@/components/TaskColumn";
import { useNotification } from "@/context/notification-context";
import { getRequest, patchRequest } from "@/utils/api";
import { useEffect, useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const columns = [
    { id: 0, title: "Open" },
    { id: 1, title: "In progress" },
    { id: 2, title: "Completed" },
    { id: 3, title: "On hold" },
];

export default function Tasks() {
    const { showErrorMessage, showSuccessMessage } = useNotification();

    const [tasks, setTasks] = useState<any>([]);

    async function moveTask(
        task: any,
        toIndex: number,
        fromColumnId: number,
        toColumnId: number
    ) {
        const updatedTasks = [...tasks];
        const movedTask = task;
        const fromIndex = tasks.findIndex((i: any) => i.id == task.id);

        if (fromColumnId === toColumnId) {
            // Moving within the same column
            updatedTasks.splice(fromIndex, 1);
            updatedTasks.splice(toIndex, 0, movedTask);
        } else {
            // Moving to a different column
            try {
                const {
                    data: { message, data },
                } = await patchRequest(`/tasks/${task?.id}`, {
                    status: columns.find((i) => i.id == toColumnId)?.title as any,
                });
                showSuccessMessage(message);
                movedTask.status = columns.find((i) => i.id == toColumnId)?.title as any;
                updatedTasks.splice(fromIndex, 1);
                updatedTasks.splice(toIndex, 0, movedTask);
            } catch (err: any) {
                console.log(err);
                showErrorMessage(
                    err?.response?.data?.message ||
                    err?.request?.message ||
                    err?.message ||
                    err ||
                    "Unknown error occured"
                );
            }
        }

        setTasks(updatedTasks);
    }

    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        try {
            const {
                data: { message, data },
            } = await getRequest(`/tasks`);
            setTasks(data?.tasks);
        } catch (err: any) {
            console.log(err);
            showErrorMessage(
                err?.response?.data?.message ||
                err?.request?.message ||
                err?.message ||
                err ||
                "Unknown error occured"
            );
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData()
    }, [])

    function onAddSuccess(task: any) {
        setTasks((prev: any) => [...prev, task])
    }

    return (
        <main className="w-full">
            <div className="top-bar mb-12 mt-8 flex justify-between">
                <div className="input-ctn w-full max-w-[300px] flex gap-[5px] items-center">
                    <input type="text" placeholder="Search task" />
                    <Button className="w-fit h-full">
                        <Icon icon="mdi:magnify" className="text-xl text-inherit" />
                    </Button>
                </div>
                <AddEditTaskModal onSuccess={onAddSuccess}>
                    <Button className="max-w-[180px]">
                        <Icon icon="mdi:plus-circle" className="text-lg text-inherit" />
                        <span>Add Task</span>
                    </Button>
                </AddEditTaskModal>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="kanban-board flex gap-[24px]">
                    {loading ? <div className="w-full h-[500px] grid place-items-center">
                        <Icon icon="mdi:loading" className="text-6xl animate-spin" />
                    </div> : columns.map((column) => (
                        <TaskColumn column={column} tasks={tasks} moveTask={moveTask} setTasks={setTasks} />
                    ))}
                </div>
            </DndProvider>
        </main>
    );
}
