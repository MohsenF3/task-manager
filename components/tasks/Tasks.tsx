"use client";

import { Tooltip } from "../material";

import { PlusIcon } from "@heroicons/react/24/outline";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import AddTaskButton from "./AddTaskButton";
import { useTasksState } from "@/context/TasksContext";
import { Task } from "@/lib/definition";

export default function Tasks({ tasks }: { tasks: Task[] }) {
  const { updateCompleted } = useTasksState();

  return (
    <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 py-5">
      {/* carts */}

      {tasks.map((task) => {
        return (
          <div
            className="bg-[#181818] relative rounded-md p-4 flex flex-col justify-between min-h-48"
            key={task.id}
          >
            <div className="mb-7">
              {/* title */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{task.title}</h3>
                {task.isImportant && (
                  <Tooltip
                    content="Important"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                    className="text-green-400 font-bold"
                  >
                    <span className=" mx-auto mt-1 block h-4 w-4 animate-pulse rounded-full bg-green-900 content-[''] absolute top-0 right-1" />
                  </Tooltip>
                )}
              </div>

              {/* description */}
              <p className="text-[13px] mt-2">{task.description}</p>
            </div>

            {/* bottom */}
            <div className="flex items-center justify-between">
              {/* left */}

              <button
                className={`${
                  task.isCompleted ? "bg-green-400" : "bg-red-400"
                } rounded-full px-2 py-1 text-sm`}
                onClick={() => {
                  const id = task.id;
                  const isCompleted = !task.isCompleted;
                  updateCompleted({ id, isCompleted });
                }}
              >
                {task.isCompleted ? "Completed" : "Incompleted"}
              </button>

              {/* right */}
              <div className="flex items-center gap-3">
                <EditTaskButton id={task.id} />

                <DeleteTaskButton id={task.id} />
              </div>
            </div>
          </div>
        );
      })}

      {/* add task */}

      <AddTaskButton style="flex min-h-48 items-center text-gray-400 hover:text-white transition-all duration-150 justify-center rounded-md border border-gray-500 border-dashed">
        <PlusIcon className="w-7 h-7" />
        <span>Add New Task</span>
      </AddTaskButton>
    </div>
  );
}
