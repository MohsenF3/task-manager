import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { getTasks } from "@/lib/data";
import { Suspense } from "react";

export default async function Incompleted() {
  const tasks = await getTasks();
  const inCompletedTasks = tasks?.filter((task) => !task.isCompleted);

  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="Incompleted Tasks" />

      {/* tasks */}
      <Suspense fallback={<Loader />}>
        <Tasks tasks={inCompletedTasks!} />
      </Suspense>
    </div>
  );
}
