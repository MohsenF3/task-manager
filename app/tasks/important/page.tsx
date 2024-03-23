import PageHeader from "@/components/PageHeader";
import Tasks from "@/components/tasks/Tasks";

export default async function Important() {
  return (
    <div className="w-full h-full py-5">
      {/* title */}

      <PageHeader title="مهم ها" />

      {/* tasks */}
      <Tasks type="important" />
    </div>
  );
}
