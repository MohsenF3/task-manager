"use client";

import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import { Tooltip } from "../material";
import { useTasksState } from "@/context/TasksContext";
import { Task } from "@/lib/definition";
import { formatDate } from "@/lib/formatDate";

export default function TaskCard({
  id,
  date,
  description,
  isCompleted,
  isImportant,
  title,
}: Task) {
  const { updateCompleted } = useTasksState();
  return (
    <div className="bg-[#181818] transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(102,187,106)] rounded-md p-4 flex flex-col justify-between min-h-48">
      <p className="absolute left-1 -top-6 text-sm   font-bold">
        {formatDate(date)}
      </p>
      <div className="mb-7">
        {/* title */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{title}</h3>
          {isImportant && (
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
        <p className="text-[13px] mt-2">{description}</p>
      </div>

      {/* bottom */}
      <div className="flex items-center justify-between">
        {/* left */}

        <button
          className={`${
            isCompleted ? "bg-green-400" : "bg-red-400"
          } rounded-full px-2 py-1 text-sm`}
          onClick={() => {
            const toggleCompleted = !isCompleted;
            updateCompleted({ id, isCompleted: toggleCompleted });
          }}
        >
          {isCompleted ? "Completed" : "Incompleted"}
        </button>

        {/* right */}
        <div className="flex items-center gap-3">
          <EditTaskButton id={id} />

          <DeleteTaskButton id={id} />
        </div>
      </div>
    </div>
  );
}
