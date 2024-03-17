import { PlusIcon } from "@heroicons/react/24/outline";
import AddTaskButton from "./AddTaskButton";
import { Task } from "@/lib/definition";
import TaskCard from "./TaskCard";

export default function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid gap-7 md:gap-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 py-5">
      {/* carts */}

      {tasks.map((task) => {
        return <TaskCard key={task.id} {...task} />;
      })}

      {/* add task */}

      <AddTaskButton style="flex min-h-48 items-center dark:text-gray-400 text-gray-500 hover:dark:text-white hover:text-gray-700 transition-all duration-150 duration-150 justify-center rounded-md border dark:border-gray-500 border-gray-700 border-dashed">
        <PlusIcon className="w-7 h-7" />
        <span>Add New Task</span>
      </AddTaskButton>
    </div>
  );
}
