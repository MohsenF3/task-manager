import PageHeader from "@/components/PageHeader";
import { Loader } from "@/components/loader";
import Tasks from "@/components/tasks/Tasks";
import { getTasks } from "@/lib/data";
import { Suspense } from "react";

export default async function Important() {
  const tasks = await getTasks();
  const importantTasks = tasks?.filter((task) => task.isImportant);

  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="مهم ها" />

      {/* tasks */}
      <Suspense fallback={<Loader />}>
        <Tasks tasks={importantTasks!} />
      </Suspense>
    </div>
  );
}
