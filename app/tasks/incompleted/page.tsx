import PageHeader from "@/components/PageHeader";
import Tasks from "@/components/tasks/Tasks";

export default async function Incompleted() {
  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="حالا انجام بده" />

      {/* tasks */}
      <Tasks type="incompleted" />
    </div>
  );
}
