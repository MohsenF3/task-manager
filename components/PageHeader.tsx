import AddTaskButton from "./tasks/AddTaskButton";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h1 className="title">{title}</h1>

      <AddTaskButton style="dark:bg-[#181818] bg-gray-500 text-white rounded-full grid w-12 h-12 place-items-center cursor-pointer group">
        <PlusIcon className="w-7 h-7 group-hover:-rotate-180 transition-all duration-500" />
      </AddTaskButton>
    </div>
  );
}
