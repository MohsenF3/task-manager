import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { getAllTasks } from "@/lib/data";
import { Suspense } from "react";

export default async function AllTasks() {
  const tasks = await getAllTasks();

  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <PageHeader title="All Tasks" />

      {/* tasks */}

      <Suspense fallback={<Loader />}>
        <Tasks tasks={tasks!} />
      </Suspense>
    </div>
  );
}
