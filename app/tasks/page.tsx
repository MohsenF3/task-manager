import PageHeader from "@/components/PageHeader";
import Tasks from "@/components/tasks/Tasks";

export default async function AllTasks() {
  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <PageHeader title="تمام کار ها" />

      {/* tasks */}

      <Tasks type="all" />
    </div>
  );
}
