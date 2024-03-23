import PageHeader from "@/components/PageHeader";
import Tasks from "@/components/tasks/Tasks";

export default async function Completed() {
  return (
    <div className="w-full h-full py-5">
      {/* title */}
      <PageHeader title="تمام شده ها" />

      {/* tasks */}
      <Tasks type="completed" />
    </div>
  );
}
