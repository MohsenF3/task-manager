"use client";

import { useState } from "react";
import { Tooltip } from "../material";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TaskModal from "./TaskModal";
import { Task } from "@/lib/definition";

export default function EditTaskButton({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Tooltip
        content="Edit Task"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        className="font-medium bg-white text-dark dark:bg-black dark:text-white"
      >
        <button className="group" onClick={handleOpen}>
          <PencilSquareIcon className="w-6 h-6 group-hover:text-green-500" />
        </button>
      </Tooltip>

      <TaskModal open={open} onOpen={handleOpen} taskType="edit" task={task} />
    </>
  );
}
