"use client";

import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import TaskModal from "./TaskModal";
import { Task } from "@/lib/definition";
import CustomTooltip from "../CustomTooltip";

export default function EditTaskButton({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <CustomTooltip title="ویرایش کردن">
        <button className="group" onClick={handleOpen}>
          <PencilSquareIcon className="w-6 h-6 group-hover:text-green-500" />
        </button>
      </CustomTooltip>

      <TaskModal open={open} onOpen={handleOpen} taskType="edit" task={task} />
    </>
  );
}
