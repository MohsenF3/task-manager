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

export default function DeleteTaskButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
            onClick={handleOpen}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
