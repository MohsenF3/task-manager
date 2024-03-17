import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import { Tooltip } from "../material";
import { Task } from "@/lib/definition";
import { formatDate } from "@/lib/utils";
import TaskStatus from "./TaskStatus";
import { getTask } from "@/lib/data";

export default async function TaskCard({
  id,
  date,
  description,
  isCompleted,
  isImportant,
  title,
}: Task) {
  const task = await getTask(id);

  return (
    <>
      <div className="dark:bg-[#181818] bg-[#FBF9F1] rounded-md p-4 flex flex-col justify-between min-h-48">
        <div className="mb-7 relative">
          <p className="absolute left-0 -top-9 text-sm   font-bold">
            {formatDate(date)}
          </p>
          {/* title */}
          <div className="flex items-center justify-between relative">
            <h3 className="text-xl font-medium">{title}</h3>
            {isImportant && (
              <Tooltip
                content="Important"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="font-medium bg-white text-dark dark:bg-black dark:text-white"
              >
                <span className=" mx-auto mt-1 block h-4 w-4 animate-pulse rounded-full bg-green-900 content-[''] absolute -top-3 -right-2" />
              </Tooltip>
            )}
          </div>

          {/* description */}
          <p className="text-[13px] mt-2">{description}</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between">
          {/* left */}

          <TaskStatus id={id} isCompleted={isCompleted} />

          {/* right */}
          <div className="flex items-center gap-3">
            <EditTaskButton id={id} task={task as Task} />

            <DeleteTaskButton id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
