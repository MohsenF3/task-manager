"use client";

import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { useTasksState } from "@/context/TasksContext";

export default function AllTasks() {
  const { tasks, isLoading } = useTasksState();

  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <PageHeader title="All Tasks" />

      {/* tasks */}
      <div>{isLoading.get ? <Loader /> : <Tasks tasks={tasks} />}</div>
    </div>
  );
}
