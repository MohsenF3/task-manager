"use client";

import { ChangeEvent, useOptimistic, useRef, useTransition } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import { Tooltip, Checkbox } from "../material";
import { Task } from "@/lib/definition";
import { formatDate } from "@/lib/utils";
import { updateTaskStatus } from "@/lib/actions";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  TCanvasConfettiInstance,
  TConductorInstance,
} from "react-canvas-confetti/dist/types";

export default function TaskCard({ task }: { task: Task }) {
  const controller = useRef<TConductorInstance | null>(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticTask, updateTask] = useOptimistic(
    task,
    (task, { isCompleted }: { isCompleted: boolean }) => {
      return { ...task, isCompleted };
    }
  );

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const isCompleted = event.target.checked;

    if (isCompleted) {
      controller.current?.run({ speed: 3, duration: 600 });
    }

    const taskId = task.id;
    updateTask({ isCompleted });
    await updateTaskStatus({ id: taskId, isCompleted });
  };

  const onInitHandler = (params: {
    confetti: TCanvasConfettiInstance;
    conductor: TConductorInstance;
  }): void => {
    controller.current = params.conductor;
  };

  return (
    <>
      <div className="dark:bg-[#181818] bg-[#FBF9F1] rounded-md p-4 flex flex-col justify-between min-h-48">
        <div className="mb-7 relative">
          <p className="absolute left-0 -top-9 text-sm   font-bold">
            {formatDate(optimisticTask.date)}
          </p>
          {/* title */}
          <div className="flex items-center justify-between relative">
            <h3 className="text-xl font-medium">{optimisticTask.title}</h3>
            {optimisticTask.isImportant && (
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
          <p className="text-[13px] mt-2">{optimisticTask.description}</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between">
          {/* left */}

          <Checkbox
            defaultChecked={optimisticTask.isCompleted}
            color="green"
            crossOrigin=""
            onChange={(event) => startTransition(() => handleChange(event))}
            label={optimisticTask.isCompleted ? "Completed" : "Incompleted"}
          />

          {/* right */}
          <div className="flex items-center gap-3">
            <EditTaskButton task={optimisticTask} />

            <DeleteTaskButton id={optimisticTask.id} />
          </div>
        </div>
      </div>

      <Fireworks onInit={onInitHandler} />
    </>
  );
}
