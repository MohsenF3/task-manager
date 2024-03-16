"use client";

import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { useTasksState } from "@/context/TasksContext";

export default function Incompleted() {
  const { isLoading, tasks } = useTasksState();
  const inCompletedTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="Incompleted Tasks" />

      {/* tasks */}
      <div>
        {isLoading.get ? <Loader /> : <Tasks tasks={inCompletedTasks} />}
      </div>
    </div>
  );
}
