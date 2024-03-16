"use client";

import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { useTasksState } from "@/context/TasksContext";

export default function Completed() {
  const { isLoading, tasks } = useTasksState();
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <PageHeader title="Completed Tasks" />

      {/* tasks */}
      <div>{isLoading.get ? <Loader /> : <Tasks tasks={completedTasks} />}</div>
    </div>
  );
}
