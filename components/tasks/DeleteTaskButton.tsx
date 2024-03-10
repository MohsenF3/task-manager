"use client";

import { useState } from "react";
import {
  Tooltip,
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
} from "../material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTasksState } from "@/context/TasksContext";

export default function DeleteTaskButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { onDelete, isLoading } = useTasksState();

  const handleOpen = () => setOpen(!open);

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
      <Tooltip
        content="Delete Task"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <button className="group" onClick={handleOpen}>
          <TrashIcon className="w-6 h-6 group-hover:text-red-500" />
        </button>
      </Tooltip>

      <Dialog open={open} size="xs" handler={handleOpen} placeholder="">
        <DialogHeader placeholder="">Are You Sure?</DialogHeader>

        <DialogFooter placeholder="">
          <Button
            placeholder=""
            variant="text"
            onClick={handleOpen}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>

          <Button
            placeholder=""
            variant="gradient"
            color="red"
            onClick={handleDelete}
            disabled={isLoading.delete}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
