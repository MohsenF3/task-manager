"use client";

import { ChangeEvent, useRef } from "react";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import { Checkbox } from "../material";
import { Task } from "@/lib/definition";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  TCanvasConfettiInstance,
  TConductorInstance,
} from "react-canvas-confetti/dist/types";
import { formatMonthDate } from "@/lib/utils";
import { useTasksState } from "@/context/TasksProvider";
import CustomTooltip from "../CustomTooltip";

export default function TaskCard({ task }: { task: Task }) {
  const { editOptimisticStatus } = useTasksState();
  const controller = useRef<TConductorInstance | null>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const isCompleted = event.target.checked;

    if (isCompleted) {
      controller.current?.run({ speed: 3, duration: 600 });
    }

    editOptimisticStatus(task.id, isCompleted);
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
          <p className="absolute right-0 -top-9 text-sm   font-bold">
            {formatMonthDate(task.date)}
          </p>
          {/* title */}
          <div className="flex items-center justify-between relative">
            <h3 className="text-xl font-medium">{task.title}</h3>
            {task.isImportant && (
              <CustomTooltip title="مهم">
                <span className=" mx-auto mt-1 block h-4 w-4 animate-pulse rounded-full bg-green-900 content-[''] absolute -top-3 -left-2" />
              </CustomTooltip>
            )}
          </div>

          {/* description */}
          <p className="text-[13px] mt-2">{task.description}</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between">
          {/* left */}

          <CustomTooltip title="تغییر وضعیت">
            <Checkbox
              defaultChecked={task.isCompleted}
              color="green"
              crossOrigin=""
              onChange={handleChange}
              label={task.isCompleted ? "کامل شده" : "کامل نشده"}
            />
          </CustomTooltip>

          {/* right */}
          <div className="flex items-center gap-3">
            <EditTaskButton task={task} />

            <DeleteTaskButton id={task.id} />
          </div>
        </div>
      </div>

      <Fireworks onInit={onInitHandler} />
    </>
  );
}
