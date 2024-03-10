"use client";

import { Loader } from "@/components/loader";
import AddTaskButton from "@/components/tasks/AddTaskButton";
import Tasks from "@/components/tasks/Tasks";
import { useTasksState } from "@/context/TasksContext";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AllTasks() {
  const { tasks, isLoading } = useTasksState();

  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="title">All Tasks</h1>

        <AddTaskButton style="bg-[#181818] rounded-full grid w-12 h-12 place-items-center cursor-pointer group">
          <PlusIcon className="w-7 h-7 group-hover:-rotate-180 transition-all duration-500" />
        </AddTaskButton>
      </div>

      {/* tasks */}
      <div>{isLoading.get ? <Loader /> : <Tasks tasks={tasks} />}</div>
    </div>
  );
}
