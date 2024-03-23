"use client";

import { useState, ReactNode } from "react";
import TaskModal from "./TaskModal";

export default function AddTaskButton({
  children,
  style,
}: {
  children: ReactNode;
  style: string;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={handleOpen} className={style}>
        {children}
      </button>

      <TaskModal open={open} onOpen={handleOpen} taskType="add" />
    </>
  );
}
