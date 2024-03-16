"use client";

import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { useTasksState } from "@/context/TasksContext";

export default function Important() {
  const { isLoading, tasks } = useTasksState();
  const importantTasks = tasks.filter((task) => task.isImportant);

  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="Important Tasks" />

      {/* tasks */}
      <div>{isLoading.get ? <Loader /> : <Tasks tasks={importantTasks} />}</div>
    </div>
  );
}
